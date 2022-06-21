/*
 * Copyright (c) tovade 2022.
 * All rights reserved
 */

import React from 'react';
import Head from 'next/head';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import Router from 'next/router';
import * as classes from '../../lib/styles/styles';
import LoadingBar from '../../components/LoadingBar';
import auth from '../../lib/api/authApi';
import { notify } from '../../components/Notifier';

export interface IState {
  loading: boolean;
  shouldRedirect: boolean;
  password: string;
  email: string;
  error: any;
}
export default class LostPassword extends React.Component<
Record<string, never>,
IState
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shouldRedirect: false,
      password: '',
      email: '',
      error: {},
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = (e) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState({ ...newState, error: {} });
  };

  isValid = () => {
    if (!this.state.password) {
      this.setState({ error: { password: 'Password is Required.' } });
      return false;
    }
    if (!this.state.email) {
      this.setState({ error: { email: 'Email is Required.' } });
      return false;
    }
    if (!(this.state.password.length >= 8)) {
      this.setState({
        error: { password: 'Invalid Password. Please try again!' },
      });
      return false;
    }
    if (!this.state.email.trim().match(/.+@.+\..+/)) {
      this.setState({ error: { email: 'Invalid Email. Please try again!' } });
      return false;
    }
    this.setState({ error: {} });
    return true;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.isValid()) {
      try {
        this.setState({ loading: true });
        const resp = await auth.sendNewPassword(
          this.state.password,
          this.state.email,
        );
        if (resp.success) {
          this.setState({
            loading: false,
            shouldRedirect: true,
          });
        } else {
          this.setState({ loading: false });
        }
        notify({ message: resp.message });
      } catch (err) {
        notify({ message: 'An error has occurred' });
      }
    }
  };

  render() {
    if (this.state.shouldRedirect) Router.push('/login');
    return (
      <div>
        <Head>
          <title> Reset Password</title>
          <meta name="description" content="This is Reset Password Page" />
        </Head>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={classes.container}
        >
          <Grid item xs={10} sm={8} md={4}>
            <Card variant="outlined" style={classes.card}>
              <CardContent>
                <Typography
                  color="secondary"
                  align="center"
                  variant="h5"
                  component="h2"
                >
                  Reset Password
                </Typography>
                <br />
                {this.state.loading ? <LoadingBar /> : <span />}
                <br />
                <br />
                <TextField
                  name="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  label="New Password"
                  margin="normal"
                  style={classes.textField}
                  helperText={
                    this.state.error.password
                      ? this.state.error.password
                      : `Password is Required. Password should be at 
                      least ́8 characters.`
                  }
                  error={!!this.state.error.password}
                />
                <TextField
                  name="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  label="Email"
                  margin="normal"
                  style={classes.textField}
                  helperText={
                    this.state.error.email
                      ? this.state.error.email
                      : 'Email is Required. Email should be like abc@example.com'
                  }
                  error={!!this.state.error.email}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  style={{ margin: '0 auto' }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
