import React,{useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackward, faForward, faPause } from "@fortawesome/free-solid-svg-icons";

const Player=({currentSong, setCurrentSong, isPlaying, setIsPlaying, songs})=>{

    const audioRef=useRef(null);

    const onPlayClick=()=>{
        setIsPlaying(prev=>!prev);
        if(isPlaying){
            audioRef.current.pause();
        } else{
            audioRef.current.play();
        }
    };

    const [songInfo, setSongInfo]=useState({
        currentTime:0,
        duration:0,
    });

    const timeUpdateHandler=(e)=>{
        const current=e.target.currentTime;
        const duration=e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime:current,
            duration:duration || 0,
        })
    };

    const formatTime=(duration)=>{
        return `${Math.floor(duration/60)}:${(Math.floor(duration%60)).toString().padStart(2,"0")}`
    };

    const streamHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({
            ...songInfo, 
            currentTime:e.target.value
        })
    }

    const trackHandler=(instruction)=>{
        let currentIndex=songs.findIndex(song=>song.id===currentSong.id);
        if(instruction==='skip-forward'){
            setCurrentSong(songs[currentIndex+1 === songs.length ? 0 : currentIndex+1]);
        } else if(instruction==='skip-back'){
            setCurrentSong(songs[currentIndex === 0 ? songs.length-1 : currentIndex-1]);
        }
    }

    useEffect(()=>{
        if(isPlaying){
            const audioPromise=audioRef.current[isPlaying ? 'play' : 'pause']();
            if(audioPromise!==undefined){
                audioPromise.catch(console.info);
            }
        }
    },[currentSong])
    
    return(
        <div className="player">
            <div className="time-control">
                <p>{formatTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime} 
                    onChange={streamHandler}
                    type="range"
                />
                <p>{formatTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={()=>trackHandler("skip-back")} 
                    className="skip-back" 
                    size="2x" 
                    icon={faBackward}
                />
                <FontAwesomeIcon 
                    onClick={onPlayClick} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={()=>trackHandler('skip-forward')} 
                    className="skip-forward" 
                    size="2x" 
                    icon={faForward}
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio}
            />
        </div>
    )
}

export default Player; 
