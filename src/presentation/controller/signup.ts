import { HttpRequest, HttpResponse } from '../protocols/http'
export class SignUpController {
  handle (httpRquest: HttpRequest): HttpResponse {
    if (!httpRquest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing params: name')
      }
    }
    return {
      statusCode: 400,
      body: new Error('Missing params: email')
    }
  }
}
