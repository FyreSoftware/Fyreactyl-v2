import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface IProps {
  openConfirm: any;
  handleClose: any;
  handleSendEmail: any;
}
function ConfirmEmailForm(props: IProps) {
  return (
    <Dialog
      open={props.openConfirm}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle color="secondary" id="form-dialog-title">
        Send Confirmation Email
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          By clicking Send, you will receive a confirmation email to activate
          your email at Mern Template. By doing this, you will able to receive
          our latest emails and promotions. Please check your email for further
          instructions. Thank you!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSendEmail} color="secondary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmEmailForm;
