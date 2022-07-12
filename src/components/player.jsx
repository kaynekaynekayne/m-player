import React,{useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

const Player=({currentSong, isPlaying, setIsPlaying})=>{

    const audioRef=useRef(null);

    const onPlaySong=()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const [songInfo, setSongInfo]=useState({
        currentTime:null,
        duration:null,
    });

    const timeUpdateHandler=(e)=>{
        const current=e.target.currentTime;
        const duration=e.target.duration;
        setSongInfo({
            ...songInfo,
            currentTime:current,
            duration,
        })
    };

    const getTime=(time)=>{
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input type="range"/>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward}/>
                <FontAwesomeIcon 
                    onClick={onPlaySong} 
                    className="play" 
                    size="2x" 
                    icon={faPlay}
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
