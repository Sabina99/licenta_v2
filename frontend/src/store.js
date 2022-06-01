import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const enhancers = [];
const middleware = [thunk];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return initialState
  }
};

export default createStore(
  rootReducer,
  loadState(),
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
)
