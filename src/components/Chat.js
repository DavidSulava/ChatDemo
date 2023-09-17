import React, {useContext, useEffect} from 'react'
import {ChatContext} from '../contexts/ChatContext';

/**
 * The Component is responsible for displaying all the chat messages.
 */
function Chat() {
    const context = useContext(ChatContext);
    var currentUser = context.msgUser.name;

    const currentDate = new Date().toLocaleDateString();
    const userRegion = navigator.language;

    var refScroll = null;

    // Scroll down when messages are updated.
    useEffect(() => {
        if (refScroll.children.length)
            refScroll.scrollTo(0, refScroll.scrollHeight);

    }, [context.msgAll]);

    return (
        <div className="chatWrapper">
            <ul ref={(elementScroll) => {
                refScroll = elementScroll;
            }}>
                {
                    context.msgAll.map((el, index) => {
                        let msgTime = el.created_at.toDate();
                        //Show time or date.
                        //If the message is not of today the variable is set to display Time, otherwise - to Date.
                        let timeStamp = msgTime.toLocaleDateString() === currentDate ? msgTime.toLocaleString(userRegion, {timeStyle: 'short'}) : msgTime.toLocaleDateString();
                        let msgType = currentUser !== el.name ? 'msg_standart' : 'msg_standart msg_user';

                        return (
                            <li key={el.id}>
                                <div className={msgType}>
                                    <span className='msg_name'> {el.name}: </span>
                                    <span className='msg_time'> {timeStamp}</span>
                                    <div className='msg_text'>
                                        {el.message}
                                    </div>
                                </div>

                            </li>)
                    })
                }
                {context.msgInProgress && <li>
                    <div className='msg_inProgress'>...sending</div>
                </li>}
            </ul>

        </div>
    )
}
export default Chat
