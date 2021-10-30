import React, { useContext, useEffect } from "react";
import AppContext from "../../../store/AppContext";
import "./ForoContainer.css";
import ForoMessage from "../ForoMessage/ForoMessage"


const ForoContainer = () => {
  const state = useContext(AppContext);
  return (
    <div className="taskContainer">
      {state.messages.map((message) => {
        return (
          <ForoMessage
            key={message.id}
            data={message}
          />
        );
      })}
    </div>
  );
};

export default ForoContainer;