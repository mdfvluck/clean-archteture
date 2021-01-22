import { HttpResponse, HttpRequest, Controller, Authentication, EmailValidator } from './login-protocols'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../error'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authenticator: Authentication

  constructor (emailValidator: EmailValidator, authenticator: Authentication) {
    this.emailValidator = emailValidator
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requireFields = ['email', 'password']
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authenticator.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok(accessToken)
    } catch {
      return serverError()
    }
  }
}
