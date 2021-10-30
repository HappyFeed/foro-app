import './App.css';
import ForumPage from "./pages/ForumPage/ForumPage"
import { AppContextWrapper } from "./store/AppContext";
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import React from 'react';


function App() {
  return (
      <AppContextWrapper>
        <PrimarySearchAppBar />
        <ForumPage />
      </AppContextWrapper>
  );
}

export default App;
