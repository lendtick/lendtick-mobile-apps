// Pulsa Reducer
// ======================= //
export const pulsaReducer = (state = {
	data: null,
	phoneNumber: null,
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_PULSA" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_PHONE_PULSA" :
			state = {
				...state,
				phoneNumber: action.phoneNumber
			}
        break;
	}
	return state;
}