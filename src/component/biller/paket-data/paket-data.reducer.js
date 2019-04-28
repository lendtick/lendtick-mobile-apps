// Paket Data Reducer
// ======================= //
export const paketDataReducer = (state = {
	data: null,
	phoneNumber: null
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_PAKET_DATA" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_PHONE_PAKET_DATA" :
			state = {
				...state,
				phoneNumber: action.phoneNumber
			}
        break;
	}
	return state;
}