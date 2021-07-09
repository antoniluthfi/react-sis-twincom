export const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
        case 'LOGOUT':
            return action.payload;
        default:
            return state;
    }
}