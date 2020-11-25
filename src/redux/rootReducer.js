import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk';
import CoursesReducer from './reducers/CoursesReducer';

const rootReducer = combineReducers({
    //reducer khai báo tại đây
    CoursesReducer,
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk));

export default store;

