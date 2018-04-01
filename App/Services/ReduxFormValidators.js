export const required = value => value ? undefined : 'This field is required'

export const number = value => value && !isNaN(Number(value)) && /^\d+(\.\d{1,2})?$/i.test(value)
  ? undefined
  : 'Please enter correct number'

export const positiveValue = value => value && !isNaN(Number(value)) && (Number(value) <= 0)
  ? 'Should be more than 0'
  : undefined
