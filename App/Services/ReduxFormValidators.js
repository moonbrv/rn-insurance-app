export const required = value => value ? undefined : 'This field is required'

export const number = value => value && isNaN(Number(value))
  ? 'Please enter correct number'
  : undefined

export const positiveValue = value => value && !isNaN(Number(value)) && (Number(value) <= 0)
  ? 'Should be more than 0'
  : undefined

export const onlyNumericCharacters = value =>
  value && /[^0-9]/i.test(value)
    ? 'Only digits allowed'
    : undefined
