import React,{useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faBackward, faForward, faPause, faVolumeUp, faShuffle } from "@fortawesome/free-solid-svg-icons";

const Player=({currentSong, setCurrentSong, isPlaying, setIsPlaying, songs})=>{

    const audioRef=useRef();

    const [songInfo, setSongInfo]=useState({
        currentTime:0,
        duration:0,
    });
    const [volume,setVolume]=useState(false);

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
    
    const formatTime=(duration)=>{
        return `${Math.floor(duration/60)}:${(Math.floor(duration%60)).toString().padStart(2,"0")}`
    };

    const streamHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({
            ...songInfo, 
            currentTime:e.target.value,
        })
    };

    const streamPercent=()=>{
        return (songInfo.currentTime / songInfo.duration) * 100 || 0;
    };

    const trackBtnHandler=async(instruction)=>{
        let currentIndex=songs.findIndex(song=>song.id===currentSong.id);
        if(instruction==='skip-forward'){
            await setCurrentSong(songs[currentIndex+1 === songs.length ? 0 : currentIndex+1]);
        } else if(instruction==='skip-back'){
            await setCurrentSong(songs[currentIndex === 0 ? songs.length-1 : currentIndex-1]);
        }
    }

    const onPlayClick=async()=>{
        if(isPlaying){
            await audioRef.current.pause();
        } else{
            await audioRef.current.play();
        }
        setIsPlaying(prev=>!prev);
    };

    const onShuffleClick=async()=>{
        const randomIndex=Math.floor(Math.random()*(songs.length))
        await setCurrentSong(songs[randomIndex]);
    }

    useEffect(()=>{
        if(isPlaying){
            const playPromise=audioRef.current.play();
            if(playPromise!==undefined){
                playPromise.catch((error)=>{});
            }
        }
    },[currentSong]);

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
                    onClick={onShuffleClick}
                    className="shuffle"
                    icon={faShuffle}
                />
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
                <div className="volume-control">
                    <label htmlFor="volume">
                        <FontAwesomeIcon
                            className="volume-up"
                            icon={faVolumeUp}
                            onClick={()=>setVolume(prev=>!prev)}
                        />
                    </label>
                    {volume && 
                        <input
                            min={0}
                            max={1}
                            step={0.01}
                            type="range"
                            className="slider"
                            onChange={(e) =>audioRef.current.volume = e.target.value}
                    />}
                </div>
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
