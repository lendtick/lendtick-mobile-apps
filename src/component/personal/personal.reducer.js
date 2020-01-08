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
<<<<<<< HEAD
=======
		break;
		case "UPDATE_DATA_PERSONAL_HOME" :
			state = {
				...state,
				data: action.data
			}
>>>>>>> master
        break;
	}
	return state;
}