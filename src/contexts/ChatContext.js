import React, {createContext, useReducer, useEffect} from 'react';
import {msgReducer, ADD_MSG_All, MSG_PROGRESS, ADD_MSG} from '../reducers/msgReducer';
import {
    query,
    orderBy,
    limit,
    onSnapshot,
    addDoc,
    where,
    deleteDoc,
    getDocs,
} from "firebase/firestore";
import {dbMsgRef} from "../firebase";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
    const initialState = {msgUser: {name: '', message: ''}, msgInProgress: false, msgAll: []};
    const [state, dispatch] = useReducer(msgReducer, initialState);
    /**
     * Get all messages from database, when component mounts.
     * Dispatch to the msgReducer, when the msgAll state changes.
     */
    useEffect(() => {
        const respQuery = query(
            dbMsgRef,
            orderBy("created_at", "asc"),
            limit(100),
        )
        onSnapshot(respQuery, snapshot => {
            dispatch({
                type: ADD_MSG_All,
                msgAll: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})),
            })
        });
    }, []);
    useEffect(() => {
        if (state.msgUser.name && state.msgUser.message) {
            dispatch({type: MSG_PROGRESS});
            if (state.msgUser.message === '$dellAll') {
                const cQuery = query(
                    dbMsgRef,
                    where('created_at', '>', new Date('2023-09-2')),
                )
                getDocs(cQuery).then(docSnap => {
                    docSnap.forEach((doc) => {
                        deleteDoc(doc.ref); // and not doc.data()
                    });
                    dispatch({type: MSG_PROGRESS});
                });
            } else {
                addDoc(dbMsgRef, {...state.msgUser})
                    .then(() => {
                        dispatch({type: MSG_PROGRESS});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            dispatch({type: ADD_MSG, msgUser: {name: state.msgUser.name, message: ''}});
        }
    }, [state.msgUser.name, state.msgUser.message]);

    return (
        <ChatContext.Provider value={{...state, dispatch}}>
            {props.children}
        </ChatContext.Provider>
    )
}
export default ChatContextProvider
