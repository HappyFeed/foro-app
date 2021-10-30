import React, { useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { collection, getDocs } from 'firebase/firestore';
import db from "../../config/firebase/firebase"
import ForoMessage from "../../components/ForoComponent/ForoMessage/ForoMessage"


const PatientsView = () => {

  const obtenerDatos = async() => {
    const datos = await getDocs(collection(db,'videos'))
    console.log(datos.docs[0].data());
  }

  useEffect(() => {
    obtenerDatos();
  },[]);

  return (
    <div className="patientsView">
      <Box>
        <ForoMessage />
      </Box>  
        
    </div>
  );
};

export default PatientsView;