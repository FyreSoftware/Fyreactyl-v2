import adminApi from '../adminApi';
import IUser from '../../interfaces/user';

export const loadUsers = (): IUser[] | any => {
  adminApi
    .fetchUsers()
    .then((resp) => {
      if (resp.success) return resp;
      return resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};
export const loadProfile = (userId) => {
  adminApi
    .fetchUser(userId)
    .then((resp) => {
      if (resp.success) return resp.response.user;
      throw resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};

export const updateProfile = (profile, userId) => {
  adminApi
    .updateUser(profile, userId)
    .then((resp) => {
      if (resp.success) return true;
      throw resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};

export const deleteProfile = (userId) => {
  adminApi
    .deleteUser(userId)
    .then((resp) => {
      if (resp.success) return true;
      throw resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};

export const uploadImage = (file, userId): any => {
  adminApi
    .uploadProfileImage(file, userId)
    .then((resp) => {
      if (resp.success) {
        return {
          message: resp.message,
          success: true,
        };
      }
      throw resp;
    })
    .catch((err) => ({
      err: true,
      message: err.message,
    }));
};
