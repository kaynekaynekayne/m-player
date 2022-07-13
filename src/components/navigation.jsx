import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({setOpenLibrary}) => {

    const onOpenLibrary=()=>{
        setOpenLibrary(prev=>!prev)
    }

    return(
        <nav>
            <h1>Player</h1>
            <button onClick={onOpenLibrary}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
};

export default Navigation;