import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import allReducers from './reducers/state'

const store = createStore(
    allReducers,
    undefined,
    applyMiddleware(reduxThunk)
)
 export default store
