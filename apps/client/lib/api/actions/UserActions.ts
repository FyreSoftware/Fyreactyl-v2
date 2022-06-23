import userProfileApi from '../userApi';

export const loadProfile = () => {
  userProfileApi
    .fetchProfile()
    .then((resp) => {
      if (resp.success) return resp.response.user;
      return resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};

export const updateProfile = (profile) => {
  userProfileApi
    .updateProfile(profile)
    .then((resp) => {
      if (resp.success) return true;
      return resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};

export const uploadImage = (file) => {
  userProfileApi
    .uploadProfileImage(file)
    .then((resp) => {
      if (resp.success) return true;
      return resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};
