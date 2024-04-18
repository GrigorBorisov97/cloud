import React, { useState } from 'react';

import Files from '../components/Files';
import Folders from '../components/Folders';

import { UserAccountInterface, FolderInfoResponse } from '../types/interfaces';

interface ExplorerProps {
    user: UserAccountInterface;
}

const Explorer = (user: ExplorerProps) => {
    const [refresh, setRefresh] = useState(1);
    const [activeFolder, setActiveFolder] = useState('');
    const [fileActions, setFileActions] = useState(true);
    const [folderInfo, setFolderInfo] = useState<FolderInfoResponse | undefined>();

    return (
        <div className='main-container'>
            <Folders 
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                setFileActions={setFileActions}
                setFolderInfo={(v: FolderInfoResponse) => setFolderInfo(v)}
                refresh={refresh}
            />
            <Files
                activeFolder={activeFolder}
                fileActions={fileActions}
                setFileActions={setFileActions}
                folderInfo={folderInfo}
                setRefresh={setRefresh}
            />
        </div>
    )
}

export default Explorer;