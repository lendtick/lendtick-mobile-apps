// Listrik Reducer
// ======================= //
export const listrikReducer = (state = {
	data: null,
	token: null
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_LISTRIK" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_TOKEN_LISTRIK" :
			state = {
				...state,
				token: action.token
			}
        break;
	}
	return state;
}