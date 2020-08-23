import React, { useState, useContext } from 'react'
import { ChatContext } from '../contexts/ChatContext';

function SendMsgForm(props) {

    const {dispatch} =  useContext(ChatContext);

    const [user, setUser]   = useState('');
    const [message, setMsg] = useState('');

    /**
     * Uses the dispatch function to send a message from an User.
     *
     * @param  {onSubmit} event
     */
    let sendMessage = (event)=>{

        event.preventDefault();

        if(!user)
            return null;
        else if(!message)
            return null;

        dispatch({type:"ADD_MSG", msgUser: {name: user, message} });
        setMsg('');
    }

    return (
        <div className='formWrapper'>
            <form onSubmit={ (ev)=>{sendMessage(ev)} }>
                <input className='inpName' value={ user } onChange={ (ev)=>{ setUser(ev.target.value) } } name='name'  placeholder='Name'   ></input>
                <textarea cols="10" className='inpMsg'  value={ message }  onChange={ (ev)=>{ setMsg(ev.target.value) } } name='message'   placeholder='...enter your Message'></textarea>
                <button type="submit" >SEND</button>
            </form>
        </div>
    )
}

export default SendMsgForm
