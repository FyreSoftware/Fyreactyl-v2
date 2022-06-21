import { connect } from 'react-redux';
import {
  loadUsers,
  loadProfile,
  updateProfile,
  deleteProfile,
  uploadImage,
} from '../../lib/redux/Admin/ActionCreators';
import AdminDashBoard from './AdminDashboard';

const mapStateToProps = (state) => ({
  users: state.admin.users,
  user: state.admin.user,
  message: state.admin.message,
  error: state.admin.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadUsers: () => {
    dispatch(loadUsers());
  },
  loadProfile: (userId) => {
    dispatch(loadProfile(userId));
  },
  updateProfile: (profile, userId) => {
    dispatch(updateProfile(profile, userId));
  },
  deleteProfile: (userId) => {
    dispatch(deleteProfile(userId));
  },
  uploadImage: (file, userId) => {
    dispatch(uploadImage(file, userId));
  },
});

const Admin = connect<any, any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(AdminDashBoard as any);

export default Admin;
