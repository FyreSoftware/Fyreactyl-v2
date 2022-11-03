import React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { EditPackagePayload } from '../../lib/interfaces/settings';
import { getPackages } from '../../lib/api/pterodactylApi';
import * as classes from '../../lib/styles/styles';
import { notify } from '../Notifier';

export interface MyProps {
  open: boolean;
  setOpen: any;
  packageId: string | null;
  onClose: (id: string, value: EditPackagePayload) => void;
}
export default function EditPackageDialog(props: MyProps) {
  const {
    onClose, open, setOpen, packageId,
  } = props;
  const [server, setServerValues] = React.useState<EditPackagePayload>({
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
    onClose(packageId, {
      name: server.name,
      memory: parseInt(server.memory),
      disk: parseInt(server.disk),
      cpu: parseInt(server.cpu),
      servers: parseInt(server.servers),
      price: server.price,
      buyable: server.buyable,
    });
  };
  React.useEffect(() => {
    if (window && window.location && open === true) {
      getPackages().then((es) => setServerValues(es.find((p) => p.id === packageId)));
    }
  }, [open]);
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
        <Button variant="contained" color="success" onClick={handleSubmit}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}
