import {
  Button, Toolbar, Grid,
  Avatar, IconButton, Stack,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MenuWithAvatar from './MenuWithAvatar';
import { styledToolbar } from '../../lib/styles/styles';
import { config } from '../../lib/config';
import Sidebar from './Sidebar';

const optionsMenu = [
  {
    text: 'My Account',
    href: '/dashboard/profile',
  },
  {
    text: 'Log out',
    href: '/logout',
  },
  {
    text: 'Dashboard',
    href: '/dashboard',
  },
];

function Header({ user, sidebar = false }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Toolbar style={styledToolbar}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item sm={11} xs={9} style={{ textAlign: 'left' }}>
            {sidebar ? (
              <>
                {' '}
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    sx={{ mr: 3, alignItems: 'left' }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Link href="/">
                    <Avatar alt="Fyre Software" src={`${config.server_url}/images/logo.png`} />
                  </Link>
                </Stack>
                <Sidebar user={user} open={open} setOpen={setOpen} />
              </>
            ) : (
              <Link href="/">
                <Avatar alt="Fyre Software" src={`${config.server_url}/images/logo.png`} />
              </Link>
            )}
          </Grid>
          <Grid item sm={1} xs={3} style={{ textAlign: 'right' }}>
            {user ? (
              <div style={{ whiteSpace: 'nowrap' }}>
                <MenuWithAvatar
                  options={optionsMenu}
                  src={user.avatarUrl}
                  alt={user.displayName}
                  isAdmin={user.isAdmin}
                />
              </div>
            ) : (
              <div>
                <Button variant="contained" color="primary" href="/signup">
                  Sign up
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}

export default Header;
