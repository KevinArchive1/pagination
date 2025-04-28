import React from 'react';
import "./App.css"
import MangaTable from './components/MangaTable';
import FileUploader from './components/FileUploader';


function App() {
  return (
    <div className="">
      <div className='Main_container'>
        <h1>Books</h1>
        <MangaTable />
      </div>
      <hr />
      <FileUploader />
    </div>
  );
}

export default App;