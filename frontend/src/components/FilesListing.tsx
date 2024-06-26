import React, { useRef, Dispatch, SetStateAction } from 'react';

import FileImg from '../assets/images/file.png'
import FileImgPNG from '../assets/images/image.png'
import FileImgVideo from '../assets/images/video.png'
import FileImgTxt from '../assets/images/txt-file.png'

import RightClickMenu from './RightClickMenu';

import { FolderInfoResponse } from '../types/interfaces';
import { JsxElement } from 'typescript';


interface FilesListingProps {
    folderInfo: FolderInfoResponse|undefined;
    setFileActions: Dispatch<SetStateAction<boolean>>;
    activeFile: string;
    setActiveFile: Dispatch<SetStateAction<string>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface FileProps {
    name: string;
    handleActiveFileChange: (val: string) => void;
    activeFile: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FilesListing = (props: FilesListingProps) => {

    const files = props.folderInfo?.files ?? [];
    let listing = [] as JSX.Element[];

    files.forEach(file => {
        listing.push((
            <File
                activeFile={props.activeFile}
                handleActiveFileChange={handleActiveFileChange}
                name={file}
                setIsOpen={props.setIsOpen}
            />));
    })

    function handleActiveFileChange(filename: string) {
        props.setActiveFile(filename);
        props.setFileActions(true);
    }

    return (
        <div className='file-container'>
            <div className='file-container-absolute'>
                {listing}
            </div>
        </div>
    )
}

const File = ({name, handleActiveFileChange, activeFile, setIsOpen}: FileProps) => {
    const fileContainerRef = useRef(null);
    const nameSplit = name.split('.');
    const extension = '.' + nameSplit[nameSplit.length - 1];
    let image: any;
    let isDoubleClick = false;

    const handleDoubleClick = () => {
        if (!isDoubleClick) 
            isDoubleClick = true;
        else 
            setIsOpen(true);

        setTimeout(() => {
            isDoubleClick = false;
        }, 200)
    }

    if ([".txt", ".csv", ".html", ".xml", ".json", ".md", ".log"].includes(extension))
        image = FileImgTxt;
    else if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".svg", ".webp"].includes(extension))
        image = FileImgPNG;
    else if ([".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm"].includes(extension))
        image = FileImgVideo;
    else
        image = FileImg;


    return (
        <div
            ref={fileContainerRef}
            className='file'
            onClick={() => {
                handleActiveFileChange(name);
                handleDoubleClick();
            }}
            style={name == activeFile ? {background: 'rgb(149, 149, 149)', color: 'white'} : {}}
        >
            <img src={image} style={{width: 20}} />
            <div>{name}</div>
            <RightClickMenu element={fileContainerRef.current} />
        </div>
    )
}

export default FilesListing;