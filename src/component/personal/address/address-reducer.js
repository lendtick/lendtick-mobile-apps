// Reducer
// ======================= //
export const addressReducer = (state = {
    isUpdate: false
}, action) => {
	switch(action.type){
		case "UPDATE_ADDRESS" :
			state = {
				...state,
				isUpdate: action.isUpdate
			}
		break;
	}
	return state;
}