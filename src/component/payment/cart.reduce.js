// Cart Reducer
// ======================= //
export const cartReducer = (state = {
    data: [],
	totalPayment: 0,
	vanumber: 0,
}, action) => {
	switch(action.type){
		case "UPDATE_CART" :
			state = {
				...state,
				data: action.data
			}
        break;
        case "UPDATE_TOTAL_PAYMENT" :
			state = {
				...state,
				totalPayment: action.totalPayment
			}
		break;
		case "UPDATE_VA_NUMBER" :
			state = {
				...state,
				vanumber: action.vanumber
			}
		break;
	}
	return state;
}