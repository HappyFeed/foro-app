import React, { useContext, useEffect } from "react";
import AppContext from "../../../store/AppContext";
import "./ForoContainer.css";
import ForoMessage from "../ForoMessage/ForoMessage"
import ForoForm from "../ForoForm/ForoForm"


const ForoContainer = () => {
  const state = useContext(AppContext);

  return (
    <div className="taskContainer">
      <ForoForm flag={true}/>
      {state.messages.map((message, index) => {
        return (
          <ForoMessage
            key={index}
            data={message}
          />
        );
      })}
    </div>
  );
};

export default ForoContainer;