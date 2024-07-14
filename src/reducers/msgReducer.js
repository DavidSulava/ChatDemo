export const ADD_MSG = 'ADD_MSG';
export const ADD_MSG_All = 'ADD_MSG_All';
export const MSG_PROGRESS = 'MSG_PROGRESS';

export const msgReducer = (state, action) => {
    switch (action.type) {
        case ADD_MSG:
            return {...state, msgUser: action.msgUser}
        case ADD_MSG_All:
            return {...state, msgAll: action.msgAll}
        case MSG_PROGRESS:
            return {...state, msgInProgress: !state.msgInProgress}
        default:
            return state;
    }
}