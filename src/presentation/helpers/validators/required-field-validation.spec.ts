import { MissingParamError } from '../../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Fields Validation', () => {
  interface SutTypes {
    sut: RequiredFieldValidation
  }

  const makeSut = (): SutTypes => {
    const sut = new RequiredFieldValidation('any_field')
    return { sut }
  }

  test('Should return a missingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ another_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return a missingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
