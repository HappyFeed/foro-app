import React, { useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import ForoContainer from "../../components/ForoComponent/ForoContainer/ForoContainer"
import AppContext from "../../store/AppContext"
import { collection, getDocs, doc } from "firebase/firestore";
import db from "../../config/firebase/firebase"

const PatientsView = () => {
  const state = useContext(AppContext);

  useEffect(() => {
    state.getMessages()
  }, []);

  return (
    <div className="patientsView">
      <ForoContainer />
    </div>
  );
};

export default PatientsView;