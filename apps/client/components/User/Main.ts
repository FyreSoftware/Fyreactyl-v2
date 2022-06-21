import { connect } from 'react-redux';
import {
  loadProfile,
  updateProfile,
  uploadImage,
} from '../../lib/redux/User/ActionCreators';
import UserDashBoard from './UserDashBoard';

interface IMapProps {
  user: {
    id: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    isAdmin: boolean;
    createdAt: string;
    emailActivated: boolean;
  };
  message: any;
  error: any;
}
const mapStateToProps = (state) => ({
  user: state.userProfile.user,
  message: state.userProfile.message,
  error: state.userProfile.error,
});

const mapDispatchToProps = (dispatch) => ({
  loadProfile: () => {
    dispatch(loadProfile());
  },
  updateProfile: (profile) => {
    dispatch(updateProfile(profile));
  },
  uploadImage: (file) => {
    dispatch(uploadImage(file));
  },
});

export default connect<IMapProps, any, Record<string, never>>(
  mapStateToProps,
  mapDispatchToProps,
)(UserDashBoard as any);
