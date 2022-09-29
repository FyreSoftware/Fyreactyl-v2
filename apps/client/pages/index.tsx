import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import useAuth from '../lib/hooks/useAuth';
import Header from '../components/Header/Header';

function Index() {
  const { user } = useAuth();
  return (
    <>
      <Header user={user} />
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
                  {user ? 'View dashboard below.' : 'Please login/signup to access your dashboard'}
                </Typography>
              </CardContent>
              <CardActions
                style={{ justifyContent: 'center', justifyItems: 'center' }}
              >
                {user ? (
                  <>
                    <Button size="small" color="secondary">
                      <Link href="/dashboard">Go to dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="small" color="secondary" href="/auth/login">
                      Login
                    </Button>
                    <Button size="small" color="primary" href="/auth/signup">
                      Sign Up
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default Index;
