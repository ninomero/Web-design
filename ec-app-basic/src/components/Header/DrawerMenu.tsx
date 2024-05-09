import React from 'react'

import { useNavigate } from 'react-router';

import { useUser } from '../../templates/UserContext';

// mui
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const DrawerMenu = () => {
    const navigate = useNavigate()
    const [userInfo,] = useUser();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* disablePaddingで位置調整している */}
                <ListItem key={"購入履歴"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* アイコン */}
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"購入履歴"} onClick={() => navigate('/order/history')} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* disablePaddingで位置調整している */}
                <ListItem key={"編集"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* アイコン */}
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary={"編集"} onClick={() => navigate('/edit')} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {/* disablePaddingで位置調整している */}
                <ListItem key={"サインイン"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {/* アイコン */}
                            <LockOpenIcon />
                        </ListItemIcon>
                        <ListItemText primary={"サインイン"} onClick={() => navigate('/signIn')} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {userInfo.length !== 0 && userInfo !== null && userInfo !== undefined?
                <>
                    <List>
                        {/* disablePaddingで位置調整している */}
                        <ListItem key={"ログアウト"} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* アイコン */}
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary={"ログアウト"} onClick={() => navigate('/logOut')} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </>
                : <></>}

        </Box>
    );

    return (
        <>
                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button color="primary" onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
        </>
    );
}

export default DrawerMenu