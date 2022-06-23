import React from 'react';
import { notify } from '../Notifier';
import UserProfile from './UserProfile';
import { authApi } from '../../lib/api';
import IUser from '../../lib/interfaces/user';
import { loadProfile, uploadImage, updateProfile } from '../../lib/api/actions/UserActions';

export interface IProps {
  user: IUser;
  message: string;
}
export interface IState {
  shouldRerender: boolean;
  openEditForm: boolean;
  openImageForm: boolean;
  openConfirmEmailForm: boolean;
}
class UserDashBoard extends React.Component<IProps, IState> {
  constructor(props) {
    super(props, {
      shouldRerender: false,
      openEditForm: false,
      openImageForm: false,
      openConfirmEmailForm: false,
    });
  }

  componentDidMount() {
    loadProfile();
    if (this.props.message) notify({ message: this.props.message });
  }

  componentDidUpdate() {
    if (this.state.shouldRerender) {
      this.setState({ shouldRerender: false });
      loadProfile();
      if (this.props.message) notify({ message: this.props.message });
    }
  }

  handleUpdateProfile = (profile) => {
    this.setState({ shouldRerender: true });
    updateProfile(profile);
  };

  handleUploadImage = (file) => {
    this.setState({ shouldRerender: true });
    uploadImage(file);
  };

  handleSendEmail = async () => {
    this.toggleConfirmEmailForm();
    const resp = await authApi.sendConfirmEmail(this.props.user.id);
    notify({ message: resp.message || resp.response.message });
  };

  toggleEditForm = () => {
    this.setState({ openEditForm: !this.state.openEditForm });
  };

  toggleImageForm = () => {
    this.setState({ openImageForm: !this.state.openImageForm });
  };

  toggleConfirmEmailForm = () => {
    this.setState({ openConfirmEmailForm: !this.state.openConfirmEmailForm });
  };

  render() {
    return (
      <div>
        <UserProfile
          toggleImageForm={this.toggleImageForm}
          toggleEditForm={this.toggleEditForm}
          toggleConfirmEmailForm={this.toggleConfirmEmailForm}
          user={this.props.user}
          openEditForm={this.state.openEditForm}
          openImageForm={this.state.openImageForm}
          openConfirmEmailForm={this.state.openConfirmEmailForm}
          handleUpdateProfile={this.handleUpdateProfile}
          handleUploadImage={this.handleUploadImage}
          handleSendEmail={this.handleSendEmail}
        />
      </div>
    );
  }
}

export default UserDashBoard;
