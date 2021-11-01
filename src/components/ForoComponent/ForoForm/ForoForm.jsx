import React, { useContext, useState } from "react";
import "./ForoForm.css";
import AppContext from "../../../store/AppContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const ForoForm = () => {
  const state = useContext(AppContext);
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    state.saveTask(text);
    setText("");
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
      <Button
      sx={{marginLeft: 1}}
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
