import React from "react";

const LibrarySong=({song, setCurrentSong, currentSong})=>{

    const onSongClick=async()=>{
        await setCurrentSong(song);
    }

    return(
        <li 
            onClick={onSongClick} 
            className={`library-song ${song.id===currentSong.id ? "selected" : ""}`}>
            <img src={song.cover} alt="cover"></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </li>
    )
}

export default LibrarySong; 
