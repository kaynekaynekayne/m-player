import React from "react";

const LibrarySong=({song, setCurrentSong})=>{

    const onSongClick=()=>{
        setCurrentSong(song);
    }

    return(
        <div onClick={onSongClick} className="library-song">
            <img src={song.cover} alt="cover"></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong; 
