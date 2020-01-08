// BPJS Reducer
// ======================= //
export const bpjsReducer = (state = {
	data: null,
	token: null
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_BPJS" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_TOKEN_BPJS" :
			state = {
				...state,
				bpjsNumber: action.bpjsNumber
			}
        break;
	}
	return state;
}