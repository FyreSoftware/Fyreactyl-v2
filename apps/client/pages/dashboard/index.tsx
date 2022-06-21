import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import withAuth from '../../lib/withAuth';

function DashboardIndex() {
  return (
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
                Welcome to your dashboard
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default withAuth(DashboardIndex, { loginRequired: true });
