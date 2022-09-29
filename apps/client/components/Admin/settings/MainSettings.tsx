import React from 'react';
import {
  Button, Card, Grid, TextField,
} from '@mui/material';
import * as classes from '../../../lib/styles/styles';
import { getSettings, updateName } from '../../../lib/api/pterodactylApi';
import { notify } from '../../Notifier';

export default function MainSettings() {
  const [name, setName] = React.useState('Fyreactyl');
  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setName(event.target.value);
  };
  const submitName = async () => {
    if (name.length < 1) return notify({ message: 'Company name must be longer than 1 character' });
    const res = await updateName(name);
    notify({ message: res.message });
  };
  React.useEffect(() => {
    if (window) {
      getSettings().then((s) => setName(s.name));
    }
  }, []);
  return (
    <>
      <Grid container style={{ gridGap: '20px' }}>
        <Card key="name" style={{ ...classes.card, width: '20%' }}>
          <h4>Company name</h4>
          <TextField
            value={name}
            onChange={handleNameChange}
            id="outlined-basic"
            variant="outlined"
            style={{
              marginBottom: '10px',
            }}
          />
          <Button onClick={submitName} id="Sub" color="success" variant="contained">Submit</Button>
        </Card>
      </Grid>
    </>
  );
}
