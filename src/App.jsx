import './App.css';
import ForumPage from "./pages/ForumPage/ForumPage"
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import React from 'react';


function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
      <ForumPage />
    </div>
  );
}

export default App;
