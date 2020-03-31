import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// different reducers
import restaurantList from 'components/restaurant/restaurantList/store/reducer';
import addReviewModal from 'components/modal/components/addReviewModal/store/reducer';

const reducers = combineReducers({
  restaurantList,
  addReviewModal
});

// create and export store
export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);
