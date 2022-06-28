import { combineReducers } from 'redux';
import { ProductReducer } from './features/product/redux/reducer';


const rootReducer = combineReducers({
 
  product: ProductReducer,
 
});

export default rootReducer;
