import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import CoursesReducer from './reducers/CoursesReducer';
import FeedbackReducer from './reducers/FeedbackReducer'

const rootReducer = combineReducers({
    //reducer khai báo tại đây
    CoursesReducer,
    FeedbackReducer,
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk));

export default store;

