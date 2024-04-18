import React from 'react';

import EmptyFolderImg from '../assets/images/folder-empty.png';
import FolderImg from '../assets/images/folder.png';

const Folder = (props) => {
    return (
        <div 
            style={{background: props.currentPath == props.activeFolder ? '#959595': '', marginLeft: props.margin * 2}}
            onClick={() => props.setCurrentFolder(props.currentPath)} className='folder'>
            <img style={{width: 30}} src={props.hasChildren ? FolderImg : EmptyFolderImg} />
            <span>{props.name}</span>
        </div>
    )
}

export default Folder;