import React, { useState , useEffect} from "react";
import * as uuid from "uuid";
import  db  from "../config/firebase/firebase"
import { collection, deleteDoc, doc , setDoc, getDocs } from "firebase/firestore";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async() => {
    const datos = await getDocs(collection(db,'messages'))
    const messages = []
    datos.forEach((documento) => {
      messages.push(documento.data().message)
    })
    setMessages(messages)
  }

  const setMessageText = (id, newMessage) => {
    const messageUpdate = messages.map((message) => {
      if (message.id === id) {
        
        return {
          ...message,
          textMessage: newMessage,
        };
      }
      return message;
    });
  
    postBD(messageUpdate.find( element => element.id === id));
  };

  const postBD = async(message) =>{
    try {
      await setDoc(doc(db, "messages", message.id), 
      {message});
      getMessages();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const saveMessage = (textMessage, textTopic) => {
    const newTask = {
      id: uuid.v1(),
      userId: uuid.v1(),
      textMessage,
      topic: textTopic
    };

    postBD(newTask);
  };



  const deleteMessage = async (messageId) => {
    await deleteDoc(doc(db, "messages", messageId));
    getMessages()
  };

  const state = {
    messages,
    setMessages,
    setMessageText,
    saveMessage,
    deleteMessage,
    getMessages
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContext;
