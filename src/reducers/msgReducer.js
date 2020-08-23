export const msgReducer = (state, action )=>{

    switch ( action.type ) {

        case 'ADD_MSG':
            return {...state, msgUser: action.msgUser }
        case 'ADD_MSG_All':
            return {...state, msgAll: action.msgAll  }
        case 'MSG_PROGRESS':
            return {...state, msgInProgress: !state.msgInProgress  }

        default:
            return state;
    }
}