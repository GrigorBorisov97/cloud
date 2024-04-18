import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import FileOpenIcon from '@mui/icons-material/FileOpen';


interface RightClickMenuProps {
  element?: HTMLElement|null
}

function RightClickMenu(props: RightClickMenuProps) {
  const [show, setShow] = useState(false);
  const [cord, setCord] = useState({x: 0, y: 0});

  useEffect(() => {
    if (!props.element) return;

    props.element.oncontextmenu = (e) => {
      e.preventDefault();
      setShow(true);
      setCord({
        x: e.x,
        y: e.y
      });
    }

    window.document.addEventListener('click', (e) => {
      e.preventDefault();
      setShow(false);
    })
  }, [props.element]);

  return (
    <div style={{display: show ? 'block' : 'none', position: 'fixed', left: cord.x, top: cord.y, zIndex: 999}}>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <FileOpenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Open</ListItemText>
          </MenuItem>
        <Divider />
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}

export default RightClickMenu;