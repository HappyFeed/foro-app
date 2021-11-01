import React from "react";
import "./ForoItem.css";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import { useContext } from "react";
import AppContext from "../../../context/AppContext";
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



const ForoItem = ({ id, message, topic, flag }) => {
  const state = useContext(AppContext);


  const [isUpdating, setIsUpdating] = useState(false);
  const [text, setText] = useState(message);
  const [permissions] = useState(flag);

  const handleUpdate = () => {
    setIsUpdating(false);
    state.setMessageText(id, text);
  };

  return (
    <Box>
      {topic !== "" ? 
      (
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          >
          {topic}
        </Typography>
      ) : (
        <div></div>
      )}
      <Card className="foroitem">
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
        {permissions ? 
        (
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
        ) : (
          <div>        
          </div>
        )}
    </Card>
    </Box>
  );
};

export default ForoItem;