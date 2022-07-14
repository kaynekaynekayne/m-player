import React from "react";
import LibrarySong from "./librarySong";

const Library = ({songs, setCurrentSong, currentSong, openLibrary}) =>{
    
    return(
        <section className={`library ${openLibrary ? "open-library" : ""}`}>
            <ul className="library-songs">
                {songs.map(song=>
                    <LibrarySong
                        key={song.id}
                        song={song} 
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />
                )}
            </ul>
        </section>
    )
};

export default Library;