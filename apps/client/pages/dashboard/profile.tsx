import React from 'react';
import Head from 'next/head';
import UserProfile from '../../components/User/UserDashBoard';
import useAuth from '../../lib/hooks/useAuth';

function Profile() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title> My Account </title>
        <meta name="description" content="User Profile" />
      </Head>
      <UserProfile user={user} message={null} />
    </>
  );
}

export default Profile;
