import React,{useState} from 'react';
import './styles/app.scss';
import data from './util';
import Player from './components/player';
import Song from './components/song';
import Library from './components/libary';
import Navigation from './components/navigation';


function App() {
  
  const [songs,setSongs]=useState(data());
  const [currentSong, setCurrentSong]=useState(songs[0]);
  const [isPlaying, setIsPlaying]=useState(false);
  const [openLibrary, setOpenLibrary]=useState(false);

  return (
    <div className="app">
      <Navigation 
        setOpenLibrary={setOpenLibrary}
      />
      <Song currentSong={currentSong}/>
      <Player 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
      <Library 
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        openLibrary={openLibrary}
      />
    </div>
  );
}

export default App;
