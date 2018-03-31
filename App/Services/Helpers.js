export const camelCaseToSpaceThenToUpper = text =>
  replace(/([A-Z])/g, ' $1').toUpperCase()
