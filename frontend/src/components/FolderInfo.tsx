import React from 'react';

interface FolderInfoProps {
    name: string;
    path: string;
    size: number|string|undefined;
    image: any;
}

const FolderInfo = ({name, path, size, image}: FolderInfoProps) => {
    return (
        <div className='folder-info-container'>
            <img src={image} width={50} />
            <div>
                <div style={{fontSize: 20}}>{name}</div>
                <div>path: {path}</div>
                <div>{size ? 'size: ' + size : ''}</div>
            </div>
        </div>
    )
}

export default FolderInfo;