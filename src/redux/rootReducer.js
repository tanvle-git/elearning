import {applyMiddleware, combineReducers, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import CoursesReducer from './reducers/CoursesReducer';
import FeedbackReducer from './reducers/FeedbackReducer';
import UserSettingReducer from './reducers/UserSettingReducer'
import UserReducer from './reducers/UserReducer'

const rootReducer = combineReducers({
    CoursesReducer,
    FeedbackReducer,
    UserSettingReducer,
    UserReducer,
})
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
);

const store = createStore(
    rootReducer,
    enhancer,
    );

export default store;

