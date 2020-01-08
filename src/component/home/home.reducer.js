// Home Reducer
// ======================= //
export const homeReducer = (state = {
	data: null,
	balance: null,
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_PERSONAL_HOME" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_BALANCE" :
			state = {
				...state,
				saldo: action.balance
			}
        break;
	}
	return state;
}