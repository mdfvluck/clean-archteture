import { MissingParamError } from '../../error'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  interface SutTypes {
    sut: ValidationComposite
    validatorStub: Validation
  }

  const makeValidator = (): Validation => {
    class ValidationStub implements Validation {
      validate (_input: any): Error {
        return null as unknown as Error
      }
    }
    return new ValidationStub()
  }

  const makeSut = (): SutTypes => {
    const validatorStub = makeValidator()
    const sut = new ValidationComposite([validatorStub])
    return {
      sut,
      validatorStub
    }
  }

  test('Should return an error if any validation fails', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return a missingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
