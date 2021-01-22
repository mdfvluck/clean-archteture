import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { EmailValidator } from '../../protocols/email-validator'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../error'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email } = httpRequest.body
    const requireFields = ['email', 'password']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    if (!this.emailValidator.isValid(email)) {
      return badRequest(new InvalidParamError('email'))
    }
    return new Promise(resolve => resolve({ statusCode: 200, body: '' }))
  }
}
