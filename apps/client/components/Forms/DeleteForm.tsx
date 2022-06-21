import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export interface IProps {
  openDelete: any;
  handleClose: any;
  handleDelete: any;
}
function DeleteForm(props: IProps) {
  return (
    <Dialog
      open={props.openDelete}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle color="secondary" id="form-dialog-title">
        Delete Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete this user account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          No
        </Button>
        <Button onClick={props.handleDelete} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteForm;
