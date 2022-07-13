import React from "react";
import LibrarySong from "./librarySong";

const Library = ({songs, setCurrentSong, currentSong, openLibrary}) =>{
    
    return(
        <div className={`library ${openLibrary ? "open-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song=>
                    <LibrarySong
                        key={song.id}
                        song={song} 
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />
                )}
            </div>
        </div>
    )
};

export default Library;