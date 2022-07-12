import React,{useState} from 'react';
import './styles/app.scss';
import Player from './components/player';
import Song from './components/song';
import data from './util';
import Library from './components/libary';


function App() {
  
  const [songs,setSongs]=useState(data());
  const [currentSong, setCurrentSong]=useState(songs[0]);
  const [isPlaying, setIsPlaying]=useState(false);

  return (
    <div className="app">
      <Song currentSong={currentSong}/>
      <Player 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library songs={songs}/>
    </div>
  );
}

export default App;
