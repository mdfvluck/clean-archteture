import { MissingParamError } from '../../error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Fields Validation', () => {
  test('Should return a missingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ another_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
