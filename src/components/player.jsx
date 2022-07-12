import React,{useRef} from "react";
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

    return(
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range"/>
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward}/>
                <FontAwesomeIcon onClick={onPlaySong} className="play" size="2x" icon={faPlay}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faForward}/>
            </div>
            <audio ref={audioRef} src={currentSong.audio}/>
        </div>
    )
}

export default Player; 
