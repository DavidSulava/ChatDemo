import React, { createContext, useReducer, useEffect } from 'react';
import {msgReducer} from '../reducers/msgReducer';
import firebase from "firebase";
import db from "../firebase";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {

    const initialState      = { msgUser:{name:'', message:''}, msgInProgress: false, msgAll:[ ]};
    const [state, dispatch] = useReducer( msgReducer, initialState );

    /**
     * Get all messages from database, when component mounts.
     * Dispatch to the msgReducer, when the msgAll state changes.
     */
    useEffect( ()=>{

        db.collection("messages").orderBy("created_at", "asc").limitToLast(100).onSnapshot( snapshot=>{

            dispatch({type:"ADD_MSG_All", msgAll: snapshot.docs.map( doc=> ({ id:doc.id, ...doc.data()}) ) })
        });

    }, []);


    /**
     * Send a Message to database, when the msgUser changes
     */
    useEffect( ()=>{

        // 1) Check if the User Name and the message are set.
        // 2) Send the message do Database.
        if( state.msgUser.name && state.msgUser.message ){

            dispatch({type:'MSG_PROGRESS'});

            let sendMessageFromUser = firebase.functions().httpsCallable('sendMessageFromUser');
            sendMessageFromUser({ ...state.msgUser })
            .then( ( )=>{
                dispatch({type:'MSG_PROGRESS'});
            })
            .catch( (err)=>{console.log(err);});


            dispatch({type:"ADD_MSG", msgUser: {name: state.msgUser.name, message: ''} });
        }

    }, [state.msgUser.name, state.msgUser.message]);


    return (
        <ChatContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider
