// Sign Reducer
// ======================= //
export const signReducer = (state = {
    isLogin: false,
    amount: 0,
	va: 0,
	responseForgotPass: null
}, action) => {
	switch(action.type){
		case "SET_LOGIN" :
			state = {
				...state,
				isLogin: action.isLogin
			}
        break;
        case "GET_PAYMENT" :
			state = {
				...state,
                amount: action.amount,
                va: action.va
			}
		break;
		case "FORGOT_PASS" :
			state = {
				...state,
                responseForgotPass: action.responseForgotPass
			}
		break;
	}
	return state;
}