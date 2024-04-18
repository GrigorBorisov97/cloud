import React from 'react';


const FolderInfo = ({name, path, size, image}) => {
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