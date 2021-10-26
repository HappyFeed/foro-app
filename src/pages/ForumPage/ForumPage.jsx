import React, { useContext, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { collection, getDocs } from 'firebase/firestore';
import db from "../../config/firebase/firebase"


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
        <Typography variant="h4" gutterBottom component="div" sx={{marginTop:10}}>
          Pacientes
        </Typography>

      </Box>  
        
    </div>
  );
};

export default PatientsView;