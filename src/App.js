//  Import dependencies
import React, { useEffect } from "react";
import "./App.css";

// Import redux components
import { Provider } from "react-redux";
import store from "./store";

// Import chat component
import Chat from "./components/chat/Chat";

// Import action
import { createSession } from "./actions/watson";

// Import axios
import axios from "axios";

delete axios.defaults.headers.common["session_id"];

var session = "undefined"

// Connect application to redux
const App = () => {
  useEffect(() => {
    if (session === "undefined" || session === "null") {
      store.dispatch(createSession());
    }
  });
  return (
    <Provider store={store}>
      <div className="container">
        <Chat />
      </div>
    </Provider>
  );
};

export default App;
