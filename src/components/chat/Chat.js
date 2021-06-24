import React, { useState, useEffect, useRef, button } from "react";
import { connect } from "react-redux";

//  Import action
import { userMessage, sendMessage } from "../../actions/watson";

const Chat = ({ chat, userMessage, sendMessage }) => {
  // Handle Users Message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);

  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chat]);

  //  Function that handles user submission
  function handleClick() {
    if(message.length > 0){
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  }

  return (
    <div className="App">
    <header className="App-header">
      <h1>Antônio Chatbot</h1>
    </header>
    <div className="chat">
      {/* Handle Messages */}
      <div className="historyContainer">
        {chat.length === 0
          ? ""
          : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}
        <div ref={endOfMessages}></div>
      </div>
      {/* Input Box */}
    </div>
    <div className="footerInput">

      <input
        id="chatBox"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type a message here..."
      ></input>
      <button className="customButton" onClick={handleClick}>
        Send
      </button>  
    </div>  
    </div>
  );
};
const mapStateToProps = (state) => ({
  chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
