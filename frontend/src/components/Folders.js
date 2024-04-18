import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

import Folder from './Folder';
import Admin from './Admin';


const Folders = (props) => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        fetchFolders();
    }, []);

    useEffect(() => {
        if (props.refresh !== 1)
            fetchFolderInfo(props.activeFolder);
    }, [props.refresh])

    useEffect(() => {
        if (loading || !data) return;
        
        const tmpPath = [];
        function traverseDirectory(directoryStructure, currentPath = '', margin = 0) {
            directoryStructure.forEach(item => {
                if (typeof item === 'string') {
                    tmpPath.push(
                        <Folder
                            key={item}
                            margin={margin}
                            name={item}
                            hasChildren={false}
                            activeFolder={props.activeFolder}
                            currentPath={(currentPath ? currentPath + '/' : '') + item}
                            setCurrentFolder={fetchFolderInfo}
                        />)
                } else if (Array.isArray(item)) {
                    const parentFolder = item[0];
                    const subfolders = item.slice(1);
                    const newPath = currentPath ? `${currentPath}/${parentFolder}` : parentFolder;

                    tmpPath.push(
                        <Folder 
                            key={item}
                            margin={margin}
                            name={parentFolder}
                            hasChildren={true}
                            activeFolder={props.activeFolder}
                            currentPath={newPath}
                            setCurrentFolder={fetchFolderInfo}
                        />)

                    traverseDirectory(subfolders, newPath, margin + 20);
                } else if (typeof item === 'object' && item !== null) {
                    traverseDirectory(Object.values(item), currentPath);
                }
            });
        }

        traverseDirectory(data);
        setPaths(tmpPath);
    }, [loading, props.activeFolder]);

    const fetchFolders = async () => {
        setLoading(true);

        const req = await fetch('http://31.220.81.184:8001/api/getFolders');
        const resp = await req.json();

        setData(resp);
        setLoading(false);
    }

    const fetchFolderInfo = async (path) => {
        props.setActiveFolder(() => path);

        const data = new URLSearchParams();
        data.append('path', path);

        const req = await fetch('http://31.220.81.184:8001/api/getInfo?path=' + path);
        const res = await req.json();

        props.setFolderInfo(res);
        props.setFileActions(false);
    }



    return (
        <div className='aside'>
            <Admin user={'Grigor'} />

            <div className='folder-container'>
                {paths}
            </div>
        </div>
    )
}

export default Folders;