import React from 'react';
import {
  Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import { getAllEggs } from '../../lib/api/pterodactylApi';

export interface MyProps {
  open: boolean;
  setOpen: any
  onClose: (value: { id: string, nest: string, name: string }) => void
}
export default function AddEggDialog(props: MyProps) {
  const { onClose, open, setOpen } = props;
  const [eggs, SetEggs] = React.useState([]);

  const handleListItemClick = (value: number) => {
    const eg = eggs.map((e) => e.filter((filteredEgg) => filteredEgg.id === value));
    onClose({ id: eg.map((mappedEgg) => mappedEgg).filter((egs) => egs.length)[0][0].id, nest: eg.map((mappedEgg) => mappedEgg).filter((egs) => egs.length)[0][0].nest, name: eg.map((mappedEgg) => mappedEgg).filter((egs) => egs.length)[0][0].name });
  };
  React.useEffect(() => {
    if (open) {
      getAllEggs().then((es) => SetEggs(es));
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={() => { setOpen(false); }}>
      <DialogTitle>Add egg</DialogTitle>
      <List>
        {eggs.map((e) => e.map((eg) => (
          <ListItem
            onClick={((ev) => handleListItemClick(ev.currentTarget.value))}
            value={eg.id}
          >
            <ListItemButton>
              <ListItemText primary={eg.name} />
            </ListItemButton>
          </ListItem>
        )))}
      </List>
    </Dialog>
  );
}
