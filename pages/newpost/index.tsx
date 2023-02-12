import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { UserContext } from '../../UserContext/UserContext';
import NotUser from '../../components/NotUser/NotUser';

const DynamicNewPost = dynamic(() => import('../../components/NewPost/NewPost'));

export default function PostPage() {
  const { user } = useContext(UserContext);
  return user ? <DynamicNewPost /> : <NotUser />;
}
