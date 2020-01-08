// Register Reducer
// ======================= //
export const creditReducer = (state = {
    data: null,
    document1: null,
    document2: null,
    document3: null,
}, action) => {
	switch(action.type){
		case "FILL_LOAN" :
			state = {
				...state,
				data: action.data
			}
        break;
        case "FILL_DOCUMENT1" :
			state = {
				...state,
				document1: action.document1
			}
        break;
        case "FILL_DOCUMENT2" :
			state = {
				...state,
				document2: action.document2
			}
        break;
        case "FILL_DOCUMENT3" :
			state = {
				...state,
				document3: action.document3
			}
        break;
	}
	return state;
}