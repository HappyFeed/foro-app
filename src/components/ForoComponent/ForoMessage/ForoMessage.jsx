import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import "./ForoMessage.css";
import Box from '@mui/material/Box';
import ForoItem from "../ForoItem/ForoItem"
import ForoForm from "../ForoForm/ForoForm"
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import { auth } from '../../../config/firebase/firebase';

const ForoContainer = ({data}) => {
  const state = useContext(AppContext);
  const [open, setOpen] = React.useState(false);

  const flagUser = (currentMessage) =>{
    if(currentMessage.userId === auth.currentUser.uid){
        return true
    }else {
        return false
    }
  }

  return (
    <div className="taskContainer">
        <Box>
            {data.father === "" ? 
            (
                <ForoItem key={data.id} id={data.id} message={data.textMessage} topic={data.topic} flag={flagUser(data)} />
            ) : (
                <div></div>
            )}
            
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Collapse in={open} timeout="auto" className="collapse" unmountOnExit>
                {state.messages.map((messageChild) =>{
                    if(messageChild.father === data.id){
                        return(
                            <ForoItem key={messageChild.id} id={messageChild.id} message={messageChild.textMessage} topic={messageChild.topic} flag={flagUser(messageChild)}/>
                        )              
                    }
                    return(
                        <div key={messageChild.id}></div>
                    )
                })
                }
                <ForoForm flag={false} father={data.id}></ForoForm>
            </Collapse>
        </Box>
        <Divider />
    </div>
  );
};

export default ForoContainer;