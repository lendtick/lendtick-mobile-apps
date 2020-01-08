// Listrik Reducer
// ======================= //
export const airReducer = (state = {
	data: null,
	token: null
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_AIR" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_TOKEN_AIR" :
			state = {
				...state,
				token: action.token
			}
        break;
	}
	return state;
}