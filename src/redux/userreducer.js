import actionTypes from './actiontype';

const initialState = {
    token: '',
    account: {
        email: '',
        _id: ''
    }
}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN: {
            console.log(action)
            const newToken = action.token;
            const account = action.user;
            return {
                ...state,
                token: newToken,
                account:account
            }
        }
        case actionTypes.USER_LOGOUT:{
            console.log('logout action');
            return {
                ...state,
                token:'',
                account:{
                    email:'',
                    _id:''
                }
            }
        }
        default: return state;
    }

}

export default userReducer;