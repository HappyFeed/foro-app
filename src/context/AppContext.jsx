import React, { useState } from "react";
import * as uuid from "uuid";
import { db } from "../config/firebase/firebase"
import { collection, deleteDoc, doc , setDoc, getDocs, getDoc } from "firebase/firestore";
import md5 from 'md5';
import { auth } from '../config/firebase/firebase';

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const [messages, setMessages] = useState([]);
  const [users, setCurrentUser] = useState(null);

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


  const saveMessage = (textMessage, textTopic, idFather) => {
    const newMessage = {
      id: uuid.v1(),
      userId: auth.currentUser.uid,
      textMessage,
      topic: textTopic,
      father: idFather
    };

    postBD(newMessage);
  };

  const deleteMessage = async (messageId) => {
    await deleteDoc(doc(db, "messages", messageId));
    getMessages()
  };

  ////////////////////////////////////////////////////////////////////

  const getUser = async(userId) => {
    const datos = await getDoc(doc(db,'usuarios', userId))
    setCurrentUser(datos.data().user)
    
  }

  const findUser = async(userId) => {
    const datos = await getDoc(doc(db,'usuarios', userId))
    return datos.data().user
  }

  const setUser = (id, newName, newLastName) => {
    users.name = newName
    users.lastName = newLastName
    postUserBD(users)
  };

  const postUserBD = async(user) =>{
    try {
      await setDoc(doc(db, "usuarios", user.id), 
      {user});
      getUser(user.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const saveUser = (userName, userLastName, userEmail, userPassword) => {
    const newUser = {
      id: auth.currentUser.uid,
      name: userName,
      lastName: userLastName,
      email: userEmail,
      password: md5(userPassword)
    };

    postUserBD(newUser);
  };



  const deleteUser = async (userId) => {
    await deleteDoc(doc(db, "usuarios", userId));
  };

  const state = {
    messages,
    setMessages,
    setMessageText,
    saveMessage,
    deleteMessage,
    getMessages,
    users,
    setCurrentUser,
    getUser,
    setUser,
    saveUser,
    deleteUser,
    findUser

  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContext;
