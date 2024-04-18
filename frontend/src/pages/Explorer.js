import { useState } from 'react';

import Files from '../components/Files';
import Folders from '../components/Folders';

const Explorer = (user) => {
    const [refresh, setRefresh] = useState(1);
    const [activeFolder, setActiveFolder] = useState('');
    const [fileActions, setFileActions] = useState(true);
    const [folderInfo, setFolderInfo] = useState();

    console.log(activeFolder);

    return (
        <div className='main-container'>
            <Folders 
                activeFolder={activeFolder}
                setActiveFolder={setActiveFolder}
                setFileActions={setFileActions}
                setFolderInfo={(v) => setFolderInfo(v)}
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