import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as classes from '../../../lib/styles/styles';
import Header from '../../../components/Header/Header';
import useAuth from '../../../lib/hooks/useAuth';
import { getDBEggs, getSettings } from '../../../lib/api/pterodactylApi';
import Footer from '../../../components/Footer';

export default function Create() {
  const [DBEggs, SetDBEggs] = React.useState([]);
  const [DBNodes, setDBNodes] = React.useState([]);
  const [server, setServerValues] = React.useState({
    name: ' ',
    memory: ' ',
    disk: ' ',
    cpu: ' ',
    egg: ' ',
    node: ' ',
  });
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
  React.useEffect(() => {
    if (window && window.location && !DBEggs.length) {
      getDBEggs().then((es) => SetDBEggs(es));
    }
  }, [DBEggs]);
  React.useEffect(() => {
    if (window && window.location && !DBNodes.length) {
      getSettings().then((es) => setDBNodes(es.nodes));
    }
  }, [DBNodes]);
  const handleOnChange = (e) => {
    const { name } = e.target;
    const dbServer = server;
    dbServer[name] = e.target.value;
    return setServerValues({ ...dbServer });
  };
  return (
    <>
      <Head>
        <title>Servers | Create</title>
        <meta name="description" content="This is the Server create page" />
      </Head>
      <Header user={user} sidebar />
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={classes.container}
      >
        <Grid item xs={10} sm={8} md={4}>
          <Card style={classes.card}>
            <CardHeader title="Create server" />
            <CardContent>
              <TextField
                name="name"
                id="server-name"
                variant="outlined"
                value={server.name}
                onChange={handleOnChange}
                label="Name"
                style={{ ...classes.textField, marginBottom: '40px' }}
                required
              />
              <br />
              <TextField
                name="cpu"
                id="server-cpu"
                variant="outlined"
                label="Cpu"
                value={server.memory}
                onChange={handleOnChange}
                style={{ ...classes.textField, marginBottom: '40px' }}
                required
              />
              <br />
              <TextField
                name="memory"
                id="server-memory"
                variant="outlined"
                label="Memory"
                value={server.memory}
                onChange={handleOnChange}
                style={{ ...classes.textField, marginBottom: '40px' }}
                required
              />
              <br />
              <TextField
                name="disk"
                id="server-disk"
                value={server.disk}
                variant="outlined"
                onChange={handleOnChange}
                label="Disk"
                style={{ ...classes.textField, marginBottom: '40px' }}
                required
              />
              <br />
              <Select
                name="egg"
                id="server-egg"
                value={server.egg}
                onChange={handleOnChange}
                displayEmpty
                style={{ ...classes.textField, marginBottom: '40px' }}
              >

                <MenuItem value=" ">Select egg</MenuItem>
                {DBEggs.length ? DBEggs.map((eg) => (
                  [
                    <MenuItem value={eg.id}>{eg.name}</MenuItem>,
                  ]
                )) : <></>}
              </Select>
              <br />
              <Select
                name="node"
                id="server-node"
                value={server.node}
                onChange={handleOnChange}
                displayEmpty
                style={{ ...classes.textField, marginBottom: '20px' }}
              >

                <MenuItem value=" ">Select node</MenuItem>
                {DBNodes.length ? DBNodes.map((n) => (
                  [
                    <MenuItem value={n.id}>{n.name}</MenuItem>,
                  ]
                )) : <></>}
              </Select>
            </CardContent>
            <CardActions style={{ alignItems: 'start' }}>
              <Button variant="contained" color="success">Create server</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '14vh',
        }}
      >
        <Footer />
      </Box>
    </>
  );
}
