import React from "react";

const Song=({currentSong})=>{
    return(
        <div className="song">
            <img src={currentSong.cover} alt="cover"></img>
            <div className="song_information">
                <h2>{currentSong.name}</h2>
                <h4>{currentSong.artist}</h4>
            </div>
        </div>
    )
}

export default Song; 
