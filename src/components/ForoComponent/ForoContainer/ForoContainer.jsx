import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import "./ForoContainer.css";
import ForoMessage from "../ForoMessage/ForoMessage"
import ForoForm from "../ForoForm/ForoForm"


const ForoContainer = () => {
  const state = useContext(AppContext);

  return (
    <div className="taskContainer">
      <ForoForm flag={true} father={""}/>
      {state.messages.map((message, index) => {
        if(message.father === ""){
          return (
            <ForoMessage
              key={message.id}
              data={message}
            />
          );
        }else{
          return(
            <div key={message.id}></div>
          )          
        }

      })}
    </div>
  );
};

export default ForoContainer;