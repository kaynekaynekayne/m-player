import React from "react";

const Song=({currentSong})=>{
    return(
        <section className="song">
            <img src={currentSong.cover} alt="cover"></img>
            <div className="song_information">
                <h2>{currentSong.name}</h2>
                <h4>{currentSong.artist}</h4>
            </div>
        </section>
    )
}

export default Song; 
