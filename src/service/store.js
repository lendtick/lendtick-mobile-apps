import { createStore, combineReducers } from 'redux';
import { inputReducer } from '../directive/input.component';
import { signReducer } from '../component/login/sign.reducer';
import { registerReducer } from '../component/register/register.reducer';
import { personalReducer } from '../component/personal/personal.reducer';
import { addressReducer } from '../component/personal/address/address-reducer';
import { creditReducer } from '../component/credit/credit.reducer';
import { pulsaReducer } from '../component/biller/pulsa/pulsa.reducer';
import { paketDataReducer } from '../component/biller/paket-data/paket-data.reducer';
import { listrikReducer } from '../component/biller/listrik/listrik.reducer';

const reducers = combineReducers({
	login: signReducer,
	input: inputReducer,
	register: registerReducer,
	personal: personalReducer,
	address: addressReducer,
	credit: creditReducer,
	pulsa: pulsaReducer,
	paketData: paketDataReducer,
	listrik: listrikReducer
});
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store };