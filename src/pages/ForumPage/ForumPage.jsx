import React, { useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import ForoContainer from "../../components/ForoComponent/ForoContainer/ForoContainer"
import AppContext from "../../context/AppContext"
import { collection, getDocs, doc } from "firebase/firestore";
import db from "../../config/firebase/firebase"
import BarComponent from "../../components/BarComponent/PrimarySearchAppBar"

const PatientsView = () => {
  const state = useContext(AppContext);

  useEffect(() => {
    state.getMessages()
  }, []);

  return (
    <div >
      <BarComponent />
      <ForoContainer />
    </div>
  );
};

export default PatientsView;