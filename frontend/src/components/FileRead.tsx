import React, { useEffect, Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface FileReadProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    filePath: string;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FileRead = (props: FileReadProps) => {
    useEffect(() => {
        if (props.isOpen)
            getFile(props.filePath);
    }, [props.isOpen]);

    const getFile = async (filePath: string) => {
        const req = await fetch('http://31.220.81.184:8001/api/getFile?filePath=' + encodeURIComponent(filePath));
        // const resp = await req.json();
        
        // console.log(resp);
    }

    return (
        <div>
            <Modal
                open={props.isOpen}
                onClose={() => { props.setIsOpen((isOpen) => !isOpen) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default FileRead;