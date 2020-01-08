// Sign Reducer
// ======================= //
export const personalReducer = (state = {
    data: null
}, action) => {
	switch(action.type){
		case "UPDATE_DATA_PERSONAL" :
			state = {
				...state,
				data: action.data
			}
		break;
		case "UPDATE_DATA_PERSONAL_HOME" :
			state = {
				...state,
				data: action.data
			}
        break;
	}
	return state;
}