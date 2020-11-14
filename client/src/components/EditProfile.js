import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import { Input } from '@material-ui/core';

export default function EditProfile({user}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <EditIcon style={{cursor:'pointer'}} onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <h1 className="text-center">Update Profile</h1>
              <form className="row">
                <div className="col-md-6">
                  <Input required placeholder="First Name" value={user.firstName}  />
                </div>
                <div className="col-md-6">
                  <Input required placeholder="Last Name" value={user.lastName}  />
                </div>
                <div className="col-md-6">
                  <Input required placeholder="Address " value={user.address}  />
                </div>
                <div className="col-md-6">
                  <Input required placeholder="Postal Code" value={user.postalCode}  />
                </div>
                <div className="col-md-6">
                  <Input required placeholder="Birthday" type="date" value={user.birthday}  />
                </div>
                <div className="mt-5 col-12">
                <Button type="submit"  variant="contained" size="sm" color="primary">Update</Button>
                </div>
              </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
