import React from 'react';
import { Button, Card, Grid } from '@mui/material';
import { getSettings, addNode, removeNode } from '../../../lib/api/pterodactylApi';
import { notify } from '../../Notifier';
import * as classes from '../../../lib/styles/styles';
import AddNodeDialog from '../../Dialogs/AddNodeDialog';

export default function NodeSettings() {
  const [open, setOpen] = React.useState(false);
  const [nodes, setNodes] = React.useState([]);

  const handleClose = async ({ id, name }) => {
    const rese = await addNode(id, name);
    if (!rese.error) setNodes([...nodes, { id, name }]);
    notify({ message: rese.message });
    setOpen(false);
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const res = await removeNode(id);
    if (!res.error) setNodes([...nodes.filter((ef) => ef.id === id)]);
    notify({ message: res.message });
  };
  React.useEffect(() => {
    if (window && window.location && !nodes.length) {
      getSettings().then((es) => setNodes(es.nodes ?? []));
    }
  }, [nodes]);
  return (
    <>
      <>
        <Button color="success" variant="contained" style={{ float: 'right' }} onClick={() => setOpen(true)}>Add node</Button>
        <Grid container style={{ gridGap: '20px' }}>
          {nodes.length ? nodes.map((eg) => (
            <>
              <Card key={eg.id} style={{ ...classes.card, width: '12%' }}>
                <h4>{eg.name}</h4>
                <Button id={eg.id} color="error" variant="contained" onClick={handleDelete}>Delete</Button>
              </Card>
            </>
          )) : (

            <h3>
              No nodes in the database.
            </h3>
          )}
        </Grid>
        <AddNodeDialog onClose={handleClose} open={open} setOpen={setOpen} />
      </>
    </>
  );
}
