import React from 'react';

import EmptyFolderImg from '../assets/images/folder-empty.png';
import FolderImg from '../assets/images/folder.png';


interface FolderProps {
    key: any;
    margin: number;
    name: string;
    hasChildren: boolean;
    activeFolder: string;
    currentPath: string;
    setCurrentFolder: (path: string) => void;
}

const Folder = (props: FolderProps) => {
    return (
        <div 
            style={{background: props.currentPath == props.activeFolder ? '#959595': '', marginLeft: props.margin * 2}}
            onClick={() => props.setCurrentFolder(props.currentPath)} className='folder'>
            <img style={{width: 30}} src={props.hasChildren ? FolderImg : EmptyFolderImg as any} />
            <span>{props.name}</span>
        </div>
    )
}

export default Folder;