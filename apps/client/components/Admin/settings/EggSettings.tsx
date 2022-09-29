import React from 'react';
import { Button, Card, Grid } from '@mui/material';
import { addEgg, getDBEggs, removeEgg } from '../../../lib/api/pterodactylApi';
import AddEggDialog from '../../Dialogs/AddEggDialog';
import * as classes from '../../../lib/styles/styles';
import { notify } from '../../Notifier';

export default function EggSettings() {
  const [open, setOpen] = React.useState(false);
  const [eggs, setEggs] = React.useState([]);

  const handleClose = async ({ id, nest, name }) => {
    const rese = await addEgg(id, nest, name);
    if (!rese.error) setEggs([...eggs, { id, nestId: nest, name }]);
    notify({ message: rese.message });
    setOpen(false);
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const res = await removeEgg(id);
    if (!res.error) setEggs([...eggs.filter((ef) => ef.id === id)]);
    notify({ message: res.message });
  };
  React.useEffect(() => {
    if (window && window.location && !eggs.length) {
      getDBEggs().then((es) => setEggs(es));
    }
  }, [eggs]);
  return (
    <>
      <Button color="success" variant="contained" style={{ float: 'right' }} onClick={() => setOpen(true)}>Add egg</Button>
      <Grid container style={{ gridGap: '20px' }}>
        {eggs.length ? eggs.map((eg) => (
          <>
            <Card key={eg.id} style={{ ...classes.card, width: '12%' }}>
              <h4>{eg.name}</h4>
              <Button id={eg.id} color="error" variant="contained" onClick={handleDelete}>Delete</Button>
            </Card>
          </>
        )) : (

          <h3>
            No eggs in the database.
          </h3>
        )}
      </Grid>
      <AddEggDialog onClose={handleClose} open={open} setOpen={setOpen} />
    </>
  );
}
