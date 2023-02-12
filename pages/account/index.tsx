import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { UserContext } from '../../UserContext/UserContext';
import NotUser from '../../components/NotUser/NotUser';

const DynamicAccount = dynamic(() => import('../../components/Account/Account'));

export default function AccountPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? <DynamicAccount /> : <NotUser /> }
    </div>
  );
}
