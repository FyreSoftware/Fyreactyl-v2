import React from 'react';
import {
  Button,
  Checkbox,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel,
  TextField,
} from '@mui/material';
import * as classes from '../../lib/styles/styles';
import { AddPackagePayload } from '../../lib/interfaces/settings';
import { notify } from '../Notifier';

export interface MyProps {
  open: boolean;
  setOpen: any
  onClose: (value: AddPackagePayload) => void
}
export default function AddPackageDialog(props: MyProps) {
  const { onClose, open, setOpen } = props;
  const [server, setServerValues] = React.useState<AddPackagePayload>({
    name: ' ',
    memory: 0,
    disk: 0,
    cpu: 0,
    servers: 0,
    price: '',
    buyable: false,
  });
  const handleSubmit = () => {
    ['memory', 'disk', 'cpu', 'servers'].forEach((element: string) => {
      const e = server[element];
      if (!parseInt(e)) {
        return notify({ message: `${element} must be an number` });
      }
      if (parseInt(e) <= 0) { return notify({ message: `${element} must be higher than 0` }); }
      return true;
    });
    onClose({
      name: server.name,
      memory: parseInt(server.memory),
      disk: parseInt(server.disk),
      cpu: parseInt(server.cpu),
      servers: parseInt(server.servers),
      price: server.price,
      buyable: server.buyable,
    });
  };
  const handleOnChange = (e) => {
    const { name } = e.target;
    const dbServer = server;
    dbServer[name] = e.target.value;
    return setServerValues({ ...dbServer });
  };
  const booleanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const dbServer = server;

    dbServer.buyable = checked;
    return setServerValues({ ...dbServer });
  };
  return (
    <Dialog open={open} onClose={() => { setOpen(false); }}>
      <DialogTitle>Add package</DialogTitle>
      <DialogContent>
        <br />
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
          value={server.cpu}
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
        <TextField
          name="servers"
          id="server-servers"
          variant="outlined"
          label="Servers"
          value={server.servers}
          onChange={handleOnChange}
          style={{ ...classes.textField, marginBottom: '40px' }}
          required
        />
        <br />
        <TextField
          name="price"
          id="server-price"
          variant="outlined"
          label="Price (0 = free)"
          value={server.price}
          onChange={handleOnChange}
          style={{ ...classes.textField, marginBottom: '40px' }}
          required
        />
        <br />
        <FormControlLabel control={<Checkbox onChange={booleanChange} />} label="Buyable" />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
