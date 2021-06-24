import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Chat from "./components/chat/Chat";
import { createSession } from "./actions/watson";
import axios from "axios";

delete axios.defaults.headers.common["session_id"];

var session = "undefined"

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
