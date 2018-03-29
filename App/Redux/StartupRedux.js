import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null
}, {
  prefix: '@startup/'
})

export const StartupTypes = Types
export default Creators
