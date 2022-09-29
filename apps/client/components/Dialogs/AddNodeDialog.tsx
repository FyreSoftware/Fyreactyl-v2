import React from 'react';
import {
  Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { getAllNodes } from '../../lib/api/pterodactylApi';

export interface MyProps {
  open: boolean;
  setOpen: any
  onClose: (value: { id: string, name: string }) => void
}
export default function AddNodeDialog(props: MyProps) {
  const { onClose, open, setOpen } = props;
  const [nodes, setNodes] = React.useState([]);

  const handleListItemClick = (value: number) => {
    const node: any[] = nodes.filter((nod) => nod.attributes.id === value);
    onClose({ id: node[0].attributes.id, name: node[0].attributes.name });
  };
  React.useEffect(() => {
    if (open) {
      getAllNodes().then((es) => {
        setNodes(es.data);
      });
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={() => { setOpen(false); }}>
      <DialogTitle>Add Node</DialogTitle>
      <List>
        {nodes.map((n) => (
          <ListItem
            onClick={((ev) => handleListItemClick(ev.currentTarget.value))}
            value={n.attributes.id}
          >
            <ListItemButton>
              <ListItemText primary={n.attributes.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
