import React, { useContext } from 'react';
import Auth from '../../components/Auth/Auth';
import { UserContext } from '../../UserContext/UserContext';

export default function Authentication() {
  const { user } = useContext(UserContext);
  return (
    <section className="section">
      <div className="container is-flex is-justify-content-center">
        {user ? (
          <p className="title has-text-success">
            Successfully Logged In
          </p>
        ) : (
          <Auth />
        )}
      </div>
    </section>
  );
}
