// Register Reducer
// ======================= //
export const registerReducer = (state = {
    data: null
}, action) => {
	switch(action.type){
		case "FILL_REGISTER" :
			state = {
				...state,
				data: action.data
			}
        break;
	}
	return state;
}