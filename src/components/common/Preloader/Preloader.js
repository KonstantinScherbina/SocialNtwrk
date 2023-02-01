import React from 'react';
import preloader from "../../../assets/images/preloader.svg";


// animation when loadin'
let Preloader = () => {
    return <div style={{ backgroundColor: 'white' }}>
        <img src={preloader} />
    </div>
}

export default Preloader;