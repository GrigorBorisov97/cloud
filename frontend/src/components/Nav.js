import React, { useRef } from 'react';
import { FaFolderPlus, FaUpload, FaDownload, FaFileCode, FaCopy, FaEdit, FaRemoveFormat } from "react-icons/fa";
import NavButton from './NavButton';
import RightClickMenu from './RightClickMenu';

const Nav = (props) => {
    const fileUploadRef = useRef(null);
    const selectedPath = props.activeFolder;

    const newFolder = async () => {
        const folderName = prompt('Please enter folder name');
        const data = new FormData();
        
        data.append('path', selectedPath);
        data.append('name', folderName);

        const req = await fetch('http://31.220.81.184:8001/api/newFolder', {
            method: 'POST',
            body: data
        });

        const resp = await req.json();

        if (resp.status == 'success') {
            alert('Successfully created');
            props.setRefresh((ref) => ref + 1);
        }
    }

    const renameFolder = async () => {
        const folderName = prompt('Please enter new folder name');
        const data = new FormData();
        
        data.append('path', selectedPath);
        data.append('new_name', folderName);

        const req = await fetch(`http://31.220.81.184:8001/api/renameFolder?path=${encodeURIComponent(selectedPath)}&name=${folderName}`, {
            method: 'PUT'
        });

        const resp = await req.json();

        if (resp.status == 'success') {
            props.setRefresh((ref) => ref + 1);
        }
    }

    const deleteFolder = async () => {
        let text = "Are you sure you want to delete this folder? \n Press OK to proccees.";
        if (confirm(text) == false) return;

        const req = await fetch(`http://31.220.81.184:8001/api/deleteFolder?path=${encodeURIComponent(selectedPath)}`, {
            method: 'DELETE'
        });

        const resp = await req.json();

        if (resp.status == 'success') {
            alert('Successfully deleted');
            props.setRefresh((ref) => ref + 1);
        }
    }

    const openFileUpload = () => {
        fileUploadRef.current.click();
    }

    const uploadFiles = async () => {
        const data = new FormData();
        const files = fileUploadRef.current.files;

        for (let i = 0; i < files.length; i++)
            data.append('files[]', files[i]);

        data.append('path', selectedPath);

        const req = await fetch('http://31.220.81.184:8001/api/fileUpload', {
            method: 'POST',
            body: data
        });

        const resp = await req.json();

        if (resp.status === 'success') {
            props.setRefresh((ref) => ref + 1);
        }
    }

    const fileDownload = async () => {
        const filePath = selectedPath + '/' + props.activeFile;

        const response = await fetch(`http://31.220.81.184:8001/api/fileDownload?path=${encodeURIComponent(filePath)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        const disposition = response.headers.get('Content-Disposition');
        const filenameRegex = /filename[^;=\n]*=([^\n]*)/;
        const matches = filenameRegex.exec(disposition);

        console.log(disposition);
        console.log(filenameRegex);
        console.log(response.headers);
        let filename = 'file.txt'; // Default filename
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
        }
        
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
    }

    const deleteFile = async () => {
        const filePath = selectedPath + '/' + props.activeFile;

        const req = await fetch(`http://31.220.81.184:8001/api/deleteFile?path=${encodeURIComponent(filePath)}`, {
            method: 'DELETE'
        });
        const resp = await req.json();

        if (resp.status == 'success') {
            alert('deleted successfully');
            props.setRefresh((ref) => ref + 1);
        } else alert('cannot be deleted');
    }

    return (
        <div className='nav-wrapper'>
            <input style={{display: 'none'}} type="file" name="files" id="files" onChange={uploadFiles} multiple ref={fileUploadRef} />
            {!props.fileActions ? (
                <>
                    <NavButton
                        filename='new-folder'
                        content="New Folder"
                        onAction={() => { newFolder() }}
                    />
                    <NavButton
                        filename='rename-file'
                        content="Rename Folder"
                        onAction={() => { renameFolder() }}
                    />
                    <NavButton
                        filename='folder-delete'
                        content="Delete Folder"
                        onAction={() => { deleteFolder() }}
                    />
                    <NavButton
                        filename='file-upload'
                        content="Upload Files"
                        onAction={() => { openFileUpload() }}
                    />
                </>
            ) : (
                <>
                    <NavButton
                        filename='downloads'
                        content="Download"
                        onAction={() => { fileDownload() }}
                    />
                    <NavButton
                        filename='move-up'
                        content="Move To"
                        onAction={() => { }}
                    />
                    <NavButton
                        filename='move-to-window'
                        content="Copy To"
                        onAction={() => { }}
                    />
                    <NavButton
                        filename='edit'
                        content="Rename"
                        onAction={() => { }}
                    />
                    <NavButton
                        filename='delete'
                        content="Delete"
                        onAction={() => { deleteFile() }}
                    />
                </>
            )}

            <RightClickMenu />
        </div>
    )
}

export default Nav;