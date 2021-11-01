import React, { useContext, useEffect } from "react";
import AppContext from "../../../store/AppContext";
import "./ForoMessage.css";
import Box from '@mui/material/Box';
import ForoItem from "../ForoItem/ForoItem"
import ForoForm from "../ForoForm/ForoForm"
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

const ForoContainer = ({data}) => {
  const state = useContext(AppContext);
  const [open, setOpen] = React.useState(false);


  return (
    <div className="taskContainer">
        <Box>

            <ForoItem key={data.id} id={data.id} message={data.textMessage}/>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Collapse in={open} timeout="auto" className="collapse" unmountOnExit>
                <ForoItem />
                <ForoItem />
                <ForoForm></ForoForm>
            </Collapse>
        </Box>
        <Divider />
    </div>
  );
};

export default ForoContainer;