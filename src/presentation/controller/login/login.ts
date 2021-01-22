import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError } from '../../error'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requireFields = ['email', 'password']
    for (const field of requireFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return new Promise(resolve => resolve({ statusCode: 1, body: '' }))
  }
}
