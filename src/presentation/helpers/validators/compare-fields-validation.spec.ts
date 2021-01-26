import { InvalidParamError } from '../../error'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('Compare Fields Validation', () => {
  interface SutTypes {
    sut: CompareFieldsValidation
  }

  const makeSut = (): SutTypes => {
    const sut = new CompareFieldsValidation('any_field', 'field_to_compare')
    return { sut }
  }

  test('Should return a invalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value', field_to_compare: 'another_value' })
    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should return a missingParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value', field_to_compare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
