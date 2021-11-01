import React from "react";
import "./ForoItem.css";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';


const ForoItem = ({ id, message }) => {
  const state = useContext(AppContext);

  const [isUpdating, setIsUpdating] = useState(false);
  const [text, setText] = useState(message);


  const handleUpdate = () => {
    setIsUpdating(false);
    console.log(message)
    state.setMessageText(id, message);
  };

  return (
    <Card className="taskItem">
      <div className="taskItem__title">
        {isUpdating ? (
          <TextField
            className="taskItem__input"
            label="Mensaje..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        ) : (
          <p>{text}</p>
        )}
      </div>
      <div className="taskItem__buttons">
        {isUpdating ? (
          <IconButton
            color="primary"
            onClick={handleUpdate}
            disabled={!text.length}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={() => setIsUpdating(true)}>
            <CreateIcon />
          </IconButton>
        )}
        <IconButton color="secondary" onClick={() => state.deleteMessage(id)}>
          <DeleteIcon />
        </IconButton>

      </div>
    </Card>
  );
};

export default ForoItem;