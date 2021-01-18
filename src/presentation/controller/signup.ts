export class SignUpController {
  handle (httpRquest: any): any {
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
