import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from '../../lib/hooks/useAuth';
import Header from '../../components/Header/Header';

function DashboardIndex() {
  const { user, error } = useAuth();
  const router = useRouter();

  React.useEffect((): any => {
    if (!router.isReady) return;
    if (error) router.push('/auth/login');
  },
  [
    router,
    error,
  ]);
  return (
    <>
      {user ? <Header user={user} /> : <Skeleton />}
      <div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={{ paddingTop: '40px', paddingBottom: '40px' }}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  style={{ textAlign: 'center' }}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  👋 Hello
                  {' '}
                  {user?.displayName ? user.displayName : <Skeleton />}
                  !
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default DashboardIndex;
