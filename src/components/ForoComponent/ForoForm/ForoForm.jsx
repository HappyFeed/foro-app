import React, { useContext, useState } from "react";
import "./ForoForm.css";
import AppContext from "../../../store/AppContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const ForoForm = ({ flag }) => {
  const state = useContext(AppContext);
  const [text, setText] = useState("");
  const [type, setType] = useState(flag)
  const [topic, setTopic] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    state.saveMessage(text, topic);
    setText("");
    setTopic("");
  };
  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <TextField
        className="input"
        required={true}
        value={text}
        onChange={(event) => setText(event.target.value)}
        label="Agregar comentario "
      />
      {type ? 
      (
        <TextField
        sx={{marginLeft: 2}}
         className="topic"
         required={true}
         value={topic}
         onChange={(event) => setTopic(event.target.value)}
         label="Agregar tema "
       />
      ) : (
        <div></div>
      )}
      <Button
      sx={{marginLeft: 2}}
        type="submit"
        color="primary"
        startIcon={<SaveIcon />}
        disabled={!text.length}
      >
        Guardar
      </Button>
    </form>
  );
};

export default ForoForm;
