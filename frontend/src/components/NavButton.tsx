import React from 'react';

interface NavButtonProps {
    filename: string;
    content: string;
    onAction: Function;
}

const NavButton = (props: NavButtonProps) => {
    const filename = require('../assets/images/' + props.filename + '.png');

    return (
        <button onClick={() => props.onAction()} className='nav-button'>
            <img style={{width: 20}} src={filename} />
            {props.content}
        </button>
    )
}

export default NavButton;