import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react';
import { FirebaseAuthService } from '../../helpers/FirebaseAuthService';
import { UserContext } from '../../UserContext/UserContext';

export default function MainNav() {
  const { user } = useContext(UserContext);
  const path = usePathname();
  const isActiveAccount = path === '/account';

  function handleLogOut() {
    FirebaseAuthService.logOutUser();
  }

  return (
    <nav className="level has-background-black is-flex m-0 p-5">
      <div className="level-left">
        <Link
          className="has-text-primary level-item is-size-3 has-text-weight-semibold"
          href="/"
        >
          <Image
            style={{ borderRadius: '50%', backgroundColor: 'red' }}
            src="/images/logo.jpg"
            alt="picture displaying logo"
            width={50}
            height={50}
          />
        </Link>
        {user && (
          <Link className="has-text-grey-light level-item" href="/account">
            <p style={{ fontWeight: isActiveAccount ? 'bold' : 'normal' }}>
              {user?.email}
            </p>
          </Link>
        )}
      </div>
      <div className="level-right">
        {!user && (
          <Link
            className="has-text-grey-light level-item"
            href="/authentication"
          >
            Login
          </Link>
        )}
        {user && (
          <button
            onClick={handleLogOut}
            type="button"
            className="button is-small level-item is-dark has-text-grey-light"
          >
            Logout
          </button>
        )}
        <Link className="has-text-grey-light level-item" href="/posts">
          Posts
        </Link>
        <Link className="has-text-grey-light level-item" href="/contacts">
          Contacts
        </Link>
        {user && (
          <Link className="has-text-grey-light level-item" href="/newpost">
            <span className="icon">
              <i className="fa-solid fa-square-plus" />
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
