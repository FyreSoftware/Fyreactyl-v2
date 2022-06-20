import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import withAuth from "../lib/withAuth";

function Index() {
  return (
    <div>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Grid item xs={12} md={6}>
          <Card>
              <CardContent>
                <Typography style={{ textAlign: "center"}} gutterBottom variant="h5" component="h2">
                  Welcome to your dashboard
                </Typography>
              </CardContent>
            <CardActions style={{ justifyContent: "center", justifyItems: "center"}}>
              <Button size="small" color="secondary" href="/login">
                Login
              </Button>
              <Button size="small" color="secondary">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default withAuth(Index, { loginRequired: false });
