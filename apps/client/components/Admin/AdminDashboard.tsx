import React from 'react';
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { authApi } from '../../lib/api';
import UserProfile from '../User/UserProfile';
import * as classes from '../../lib/styles/styles';
import {
  loadUsers, loadProfile, updateProfile, deleteProfile, uploadImage,
} from '../../lib/api/actions/AdminActions';
import { notify } from '../Notifier';

export interface IProps {
  user: any;
  message: string;
}
export interface IState {
  showUserProfile: boolean;
  shouldRerender: boolean;
  openEditForm: boolean;
  openImageForm: boolean;
  openDeleteForm: boolean;
  openConfirmEmailForm: boolean;
  userId: string;
}
class AdminDashBoard extends React.Component<IProps, IState> {
  private users: any[];

  constructor(props) {
    super(props, {
      showUserProfile: false,
      shouldRerender: false,
      openEditForm: false,
      openImageForm: false,
      openDeleteForm: false,
      openConfirmEmailForm: false,
      userId: '',
    });
    this.users = [];
  }

  componentDidMount() {
    this.users = loadUsers();
    if (this.props.message) notify({ message: this.props.message });
  }

  componentDidUpdate() {
    if (this.state.shouldRerender) {
      this.setState({ shouldRerender: false });
      this.users = loadUsers();
      if (this.props.message) notify({ message: this.props.message });
    }
  }

  showUserProfile = (userId) => {
    loadProfile(userId);
    this.setState({ showUserProfile: true, userId });
  };

  handleUpdateProfile = (profile) => {
    updateProfile(profile, this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleDeleteProfile = () => {
    deleteProfile(this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleUploadImage = (file) => {
    uploadImage(file, this.state.userId);
    this.setState({ shouldRerender: true });
  };

  handleSendEmail = async () => {
    this.toggleConfirmEmailForm();
    const resp = await authApi.sendConfirmEmail(this.state.userId);
    notify({ message: resp.message });
  };

  toggleEditForm = () => {
    this.setState({ openEditForm: !this.state.openEditForm });
  };

  toggleImageForm = () => {
    this.setState({ openImageForm: !this.state.openImageForm });
  };

  toggleDeleteForm = () => {
    this.setState({ openDeleteForm: !this.state.openDeleteForm });
  };

  toggleConfirmEmailForm = () => {
    this.setState({ openConfirmEmailForm: !this.state.openConfirmEmailForm });
  };

  backToUserList = () => {
    this.setState({ showUserProfile: false, userId: '' });
  };

  render() {
    if (this.state.showUserProfile && this.props.user) {
      return (
        <UserProfile
          toggleImageForm={this.toggleImageForm}
          toggleEditForm={this.toggleEditForm}
          toggleDeleteForm={this.toggleDeleteForm}
          toggleConfirmEmailForm={this.toggleConfirmEmailForm}
          backToUserList={this.backToUserList}
          user={this.props.user}
          openEditForm={this.state.openEditForm}
          openImageForm={this.state.openImageForm}
          openDeleteForm={this.state.openDeleteForm}
          openConfirmEmailForm={this.state.openConfirmEmailForm}
          handleUpdateProfile={this.handleUpdateProfile}
          handleDeleteProfile={this.handleDeleteProfile}
          handleUploadImage={this.handleUploadImage}
          handleSendEmail={this.handleSendEmail}
        />
      );
    }
    return (
      <div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          style={classes.container}
        >
          <Grid item xs={10} sm={8} md={4}>
            <Paper style={{ padding: '10px' }} elevation={4}>
              <Typography
                style={{ margin: '20px' }}
                color="secondary"
                variant="h6"
              >
                Users List
              </Typography>
              <List>
                {this.users.length > 0
                  && this.users.map((user, idx) => (
                    <ListItem key={idx}>
                      <ListItemAvatar style={{ marginRight: '20px' }}>
                        <Avatar
                          style={{
                            width: '50px',
                            height: 'auto',
                            borderRadius: '50%',
                          }}
                          src={
                              user.avatarUrl
                              || 'https://cdn4.iconfinder.com/data/icons/green-shopper/1068/user.png'
                            }
                          alt="User Profile Image"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.displayName}
                        secondary={user.email}
                      />
                      <IconButton
                        onClick={() => this.showUserProfile(user.id)}
                      >
                        <ArrowForward />
                      </IconButton>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default AdminDashBoard;
