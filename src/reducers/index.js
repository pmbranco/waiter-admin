import { combineReducers } from 'redux'
import counter from './counter'
import { reducer as reduxFormReducer } from 'redux-form'

const rootReducer = combineReducers({
  counter,
  form: reduxFormReducer,
})

export default rootReducer
