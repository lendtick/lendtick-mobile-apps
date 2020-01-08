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
<<<<<<< HEAD
import { cartReducer } from '../component/payment/cart.reduce'; 
=======
import { bpjsReducer } from '../component/biller/bpjs/bpjs.reducer';
import { airReducer } from '../component/biller/air/air.reducer';
import { cartReducer } from '../component/payment/cart.reduce'; 
import { homeReducer } from '../component/home/home.reducer'; 
>>>>>>> master

const reducers = combineReducers({
	login: signReducer,
	input: inputReducer,
	register: registerReducer,
	personal: personalReducer,
	address: addressReducer,
	credit: creditReducer,
	pulsa: pulsaReducer,
	paketData: paketDataReducer,
	listrik: listrikReducer,
<<<<<<< HEAD
	cart: cartReducer
=======
	cart: cartReducer,
	home:homeReducer,
	bpjs:bpjsReducer,
	air:airReducer
>>>>>>> master
});
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export { store };