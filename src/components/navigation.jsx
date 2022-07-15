import React,{memo} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation = memo(({setOpenLibrary}) => {

    const onOpenLibrary=()=>{
        setOpenLibrary(prev=>!prev)
    }

    return(
        <nav>
            <h1>Stream</h1>
            <button onClick={onOpenLibrary}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        </nav>
    )
});

export default Navigation;