import React, { useState, SetStateAction, Dispatch  } from 'react';
import Nav from './Nav';
import FolderInfo from './FolderInfo';
import FilesListing from './FilesListing';
import FileRead from './FileRead';

import FileImg from '../assets/images/file.png'
import FolderImg from '../assets/images/folder.png';
import FileImgPNG from '../assets/images/image.png'
import FileImgVideo from '../assets/images/video.png'
import FileImgTxt from '../assets/images/txt-file.png'

import { FolderInfoResponse } from '../types/interfaces';

interface FilesProps {
    activeFolder: string;
    fileActions: boolean;
    setFileActions: Dispatch<SetStateAction<boolean>>;
    folderInfo: FolderInfoResponse|undefined;
    setRefresh: Dispatch<SetStateAction<number>>;
}

const Files = (props: FilesProps) => {
    const [activeFile, setActiveFile] = useState('');
    const [openFile, setOpenFile] = useState(false);

    let infoName, infoPath, infoSize, infoImage;
    if (!props.fileActions) {
        infoName = props.activeFolder.split('/')[props.activeFolder.split('/').length - 1];
        infoPath = props.activeFolder;
        infoSize = props.folderInfo?.folder_size;
        infoImage = FolderImg;
    } else {
        infoName = activeFile;
        infoPath = props.activeFolder;
        infoSize = '';
        infoImage = FolderImg;

        const nameSplit = infoName.split('.');
        const extension = '.' + nameSplit[nameSplit.length - 1];
        let image;
    
        if ([".txt", ".csv", ".html", ".xml", ".json", ".md", ".log"].includes(extension))
            infoImage = FileImgTxt;
        else if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp"].includes(extension))
            infoImage = FileImgPNG;
        else if ([".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"].includes(extension))
            infoImage = FileImgVideo;
        else
            infoImage = FileImg;
    }

    return (
        <div className='files-container'>
            {(props.activeFolder !== '' || true) && (
                <>
                    <Nav
                        activeFolder={props.activeFolder}
                        fileActions={props.fileActions}
                        activeFile={activeFile}
                        setRefresh={props.setRefresh}
                    />

                    <FolderInfo
                        name={infoName}
                        path={infoPath}
                        size={infoSize}
                        image={infoImage}
                    />
                    
                    <FilesListing 
                        folderInfo={props.folderInfo}
                        setFileActions={props.setFileActions}
                        activeFile={activeFile}
                        setActiveFile={setActiveFile}
                        setIsOpen={setOpenFile}
                    />

                    <FileRead
                        isOpen={openFile}
                        setIsOpen={setOpenFile}
                        filePath={infoPath + '/' + activeFile}
                    />
                </>
            )}
        </div>
    )
}

export default Files;