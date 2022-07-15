import React,{useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackward, faForward, faPause } from "@fortawesome/free-solid-svg-icons";

const Player=({currentSong, setCurrentSong, isPlaying, setIsPlaying, songs})=>{

    const audioRef=useRef();

    const [songInfo, setSongInfo]=useState({
        currentTime:0,
        duration:0,
    });

    const timeUpdateHandler=()=>{
        const current=audioRef.current.currentTime;
        const duration=audioRef.current.duration;
        setSongInfo({
            currentTime:current,
            duration:duration || 0,
        })
        if(current===duration){
            let currentIndex=songs.findIndex(song=>song.id===currentSong.id);
            setCurrentSong(songs[currentIndex+1 === songs.length ? 0 : currentIndex+1]);
        }
    };

    const streamHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({
            ...songInfo, 
            currentTime:e.target.value,
        })
    };
    
    const formatTime=(duration)=>{
        return `${Math.floor(duration/60)}:${(Math.floor(duration%60)).toString().padStart(2,"0")}`
    };


    const trackBtnHandler=async(instruction)=>{
        let currentIndex=songs.findIndex(song=>song.id===currentSong.id);
        if(instruction==='skip-forward'){
            await setCurrentSong(songs[currentIndex+1 === songs.length ? 0 : currentIndex+1]);
        } else if(instruction==='skip-back'){
            await setCurrentSong(songs[currentIndex === 0 ? songs.length-1 : currentIndex-1]);
        }
    }

    const onPlayClick=()=>{
        if(isPlaying){
            audioRef.current.pause();
        } else{
            onPlaySong();
        }
        setIsPlaying(prev=>!prev);
    };

    const onPlaySong=async()=>await audioRef.current.play();

    useEffect(()=>{
        if(isPlaying){
            onPlaySong();
        }
    },[currentSong]);

    const streamPercent=()=>{
        return (songInfo.currentTime / songInfo.duration) * 100 || 0;
    };

    return(
        <section className="player">
            <div className="time-control">
                <div className="track" style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input
                        min={0} 
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime} 
                        onChange={streamHandler}
                        aria-label="streaming bar"
                        type="range"
                    />
                    <div 
                    className="animate-track" 
                    style={{transform:`translateX(${streamPercent()}%)`}}></div>
                </div>
                <div className="time-stream">
                    <p>{formatTime(songInfo.currentTime)}</p>
                    <p>{formatTime(songInfo.duration)}</p>
                </div>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    onClick={()=>trackBtnHandler("skip-back")} 
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
                    onClick={()=>trackBtnHandler('skip-forward')} 
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
        </section>
    )
}

export default Player; 
