import React from 'react';
import {
  Button, Card, Grid, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import * as classes from '../../../lib/styles/styles';
import AddEggDialog from '../../Dialogs/AddEggDialog';
import {
  addEgg, addPackage, editPackage, getDBEggs, getPackages, removeEgg, removePackage,
} from '../../../lib/api/pterodactylApi';
import { notify } from '../../Notifier';
import AddPackageDialog from '../../Dialogs/AddPackageDialog';
import { AddPackagePayload, EditPackagePayload } from '../../../lib/interfaces/settings';
import EditPackageDialog from '../../Dialogs/EditPackageDialog';

export default function PackageSettings() {
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [packages, setPackages] = React.useState([]);
  const [editedPack, setEditedPack] = React.useState(null);
  const handleClose = async (payload: AddPackagePayload) => {
    const rese = await addPackage(payload);
    if (!rese.error) setPackages(rese.data);
    notify({ message: rese.message });
    setOpen(false);
  };
  const handleEditClose = async (id: string, payload: EditPackagePayload) => {
    const rese = await editPackage(id, payload);
    if (!rese.error) {
      const packageData = packages.find((p) => p.id === id);
      const oldPackages = packages.filter((p) => p.id === id);
      oldPackages.push({ ...packageData, ...payload });
      setPackages([...oldPackages]);
    }
    notify({ message: rese.message });
    setOpen(false);
  };
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const res = await removePackage(id);
    if (!res.error) {
      packages.length === 1 ? setPackages([]) : setPackages([...packages.filter((ef) => ef.id === parseInt(id))]);
    }
    notify({ message: res.message });
  };
  React.useEffect(() => {
    if (window && window.location && !packages.length && !loaded) {
      setLoaded(true);
      getPackages().then((es) => setPackages(es));
    }
  }, [packages]);
  return (
    <>
      <Button color="success" variant="contained" style={{ float: 'right' }} onClick={() => setOpen(true)}>Add package</Button>
      <Grid container style={{ gridGap: '20px' }}>
        {packages.length > 0 ? packages.map((eg) => (
          <>
            <Card key={eg.id} style={{ ...classes.card, width: '13%' }}>
              <h4>{eg.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                  size="medium"
                  onClick={() => {
                    console.log(eg);
                    setEditedPack(eg.id);
                    setOpenEdit(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <Button id={eg.id} color="error" variant="contained" onClick={handleDelete}>Delete</Button>
              </div>
            </Card>
          </>
        )) : (

          <h3>
            No packages in the database.
          </h3>
        )}
      </Grid>
      <EditPackageDialog open={openEdit} setOpen={setOpenEdit} packageId={editedPack} onClose={handleEditClose} />
      <AddPackageDialog onClose={handleClose} open={open} setOpen={setOpen} />
    </>
  );
}
