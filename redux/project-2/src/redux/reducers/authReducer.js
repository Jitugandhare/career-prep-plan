const initialState = {
    isAuthenticated: false,
};



function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true }
        case 'LOGOUT':
            return { isAuthenticated: false }
        default:
            return state;
    }
}

export default authReducer;