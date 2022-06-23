import { useEffect, useState } from 'react';
import userApi from '../api/userApi';

export default function useAuth(): any {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    userApi.fetchProfile().then((res) => {
      if (res && res.success) {
        setUser(res.response.user);
      } else {
        setError(res);
        setUser(null);
      }
    }).finally(() => setLoading(false));
  }, []);

  return { user, error, loading };
}
