import React from 'react';

import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export const AdminItems = [{
  name: 'Home',
  to: '/admin',
  icon: <HomeIcon />,
}, {
  name: 'Settings',
  to: '/admin/settings',
  icon: <BuildIcon />,
}];
export const UserItems = [{
  name: 'Dashboard',
  to: '/dashboard',
  icon: <HomeIcon />,
},
{
  name: 'Create server',
  to: '/dashboard/servers/create',
  icon: <ControlPointIcon />,
}];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function Sidebar({ open, setOpen, user }: any) {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {UserItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton href={item.to}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {user && user.isAdmin ? (
          <>
            <Divider textAlign="center">Admin</Divider>
            <List>
              {AdminItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton href={item.to}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : (<></>)}
      </Drawer>
    </>
  );
}
