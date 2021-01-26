import { MissingParamError } from '../../error'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  interface SutTypes {
    sut: ValidationComposite
    validatorStubs: Validation[]
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
    const validatorStubs = [
      makeValidator(),
      makeValidator()
    ]
    const sut = new ValidationComposite(validatorStubs)
    return {
      sut,
      validatorStubs
    }
  }

  test('Should return an error if any validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
  test('Should return a first error if both validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('second_any_field'))
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return a missingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
