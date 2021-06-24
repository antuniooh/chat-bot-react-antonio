// Import types
import {
  INPUT_SUCCESS,
  INPUT_FAIL,
  SESSION_SUCCESS,
  SESSION_FAIL,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
} from "./types";

//  Import axios
import axios from "axios";

//  Function that handles  users message
export const userMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: INPUT_SUCCESS, payload: message });
  } catch (err) {
    dispatch({ type: INPUT_FAIL });
  }
};

//  Creates a session - API CALL
export const createSession = () => async (dispatch) => {
  try {
    console.log("Create session")
    const res = await axios.get("https://server-chatbot-antonio.herokuapp.com/api/watson/session")
    .then(function (response) {
      console.log("Criei a sessão");
      axios.defaults.headers.common["session_id"] = response.data['session_id'];
  })
  .catch(function (error) {
      console.log(error);
  });
    dispatch({ type: SESSION_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: SESSION_FAIL });
  }
};

//  Sends the message to the bot - API CALL
export const sendMessage = (message) => async (dispatch) => {
  try {
    const body = { input: message };
    const res = await axios.post("https://server-chatbot-antonio.herokuapp.com/api/watson/message", body)
 
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: res.data.output.generic[0].text,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};
