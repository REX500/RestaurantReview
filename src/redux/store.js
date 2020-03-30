import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// different reducers
import restaurantList from 'components/restaurant/restaurantList/store/reducer';

const reducers = combineReducers({
  restaurantList
});

// create and export store
export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);
