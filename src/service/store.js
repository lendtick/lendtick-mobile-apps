import { createStore, combineReducers } from 'redux';
import { inputReducer } from '../directive/input.component';
import { signReducer } from '../component/login/sign.reducer';
import { registerReducer } from '../component/register/register.reducer';
import { personalReducer } from '../component/personal/personal.reducer';
import { addressReducer } from '../component/personal/address/address-reducer'

const reducers = combineReducers({
	login: signReducer,
	input: inputReducer,
	register: registerReducer,
	personal: personalReducer,
	address: addressReducer
});
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store };