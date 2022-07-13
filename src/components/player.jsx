import React,{useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackward, faForward, faPause } from "@fortawesome/free-solid-svg-icons";

const Player=({currentSong, isPlaying, setIsPlaying})=>{

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

    useEffect(()=>{
        if(isPlaying){
            audioRef.current.play();
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
                <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward}/>
                <FontAwesomeIcon 
                    onClick={onPlayClick} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faForward}/>
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
