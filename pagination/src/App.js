import React from 'react';
import "./App.css"
import MangaTable from './components/MangaTable';


function App() {
  return (
    <div className="">
      <div className='Main_container'>
        <h1 className='title'>Books</h1>
        <MangaTable />
      </div>
    </div>
  );
}

export default App;