import React,{useState} from 'react';
import './styles/app.scss';
import Player from './components/player';
import Song from './components/song';
import data from './util';

function App() {
  
  const [songs,setSongs]=useState(data());
  const [currentSong, setCurrentSong]=useState(songs[0]);

  return (
    <div className="app">
      <Song currentSong={currentSong}/>
      <Player />
    </div>
  );
}

export default App;
