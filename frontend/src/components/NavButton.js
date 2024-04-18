import React from 'react';

const NavButton = (props) => {
    const filename = require('../assets/images/' + props.filename + '.png');

    return (
        <button onClick={() => props.onAction()} className='nav-button'>
            <img style={{width: 20}} src={filename} />
            {props.content}
        </button>
    )
}

export default NavButton;