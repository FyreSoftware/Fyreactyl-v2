import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import withAuth, { IProps } from "../lib/withAuth";
import Router from "next/router";
function Index(props: IProps) {
  if (props.user) {
    return Router.push("/dashboard");
  }
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
              <Typography
                style={{ textAlign: "center" }}
                gutterBottom
                variant="h5"
                component="h2"
              >
                Please login/signup to access your dashboard
              </Typography>
            </CardContent>
            <CardActions
              style={{ justifyContent: "center", justifyItems: "center" }}
            >
              <Button size="small" color="secondary" href="/auth/login">
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
