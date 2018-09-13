import { createStore, combineReducers } from 'redux';
import { loginReducer } from '../component/login/login.component';
import { addressReducer } from '../component/profile/address/address-reducer';

const reducers = combineReducers({
	login: loginReducer,
	address: addressReducer
});
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// store.subscribe(() =>
// 	console.log(store.getState())
// )

export { store };