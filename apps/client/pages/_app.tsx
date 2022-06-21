/* eslint-disable react/jsx-props-no-spreading */

// CSR for Header
// import dynamic from 'next/dynamic';
// const Header = dynamic(import('../components/Header'), {ssr: false});

import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress } from '@mui/material';
import ConfigStore from '../lib/redux/configStore';
import Header from '../components/Header/Header';
import { Notifier } from '../components/Notifier';
import theme from '../lib/styles/theme';

const store = ConfigStore();

export interface IProps {
  Component: any;
  pageProps: any;
}
export interface IState {
  loading: boolean;
}
export default class MyApp extends App<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return !(this.state as IState).loading ? (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <CssBaseline />
          <Header {...pageProps} />
          <Component {...pageProps} />
          <Notifier />
        </ThemeProvider>
      </Provider>
    ) : (
      <CircularProgress />
    );
  }
}
