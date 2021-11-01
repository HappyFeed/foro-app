import React, { useContext, useEffect } from "react";
import ForoContainer from "../../components/ForoComponent/ForoContainer/ForoContainer"
import AppContext from "../../context/AppContext"
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