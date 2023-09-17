import React from 'react';
import Chat from './components/Chat';
import SendMsgForm from "./components/SendMsgForm";
import ChatContextProvider from './contexts/ChatContext';

import './scss/styles.scss';

function App() {
    return (
        <ChatContextProvider>
            <Chat/>
            <SendMsgForm/>
        </ChatContextProvider>

    );
}

export default App;
