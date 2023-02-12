import Image from 'next/image';
import React, { useState } from 'react';
import { FirebaseAuthService } from '../../helpers/FirebaseAuthService';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(email, password);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleRegisterUser(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    try {
      await FirebaseAuthService.registerUser(email, password);
      setEmail('');
      setPassword('');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleSendResetPasswordEmail() {
    if (!email) {
      alert('Missing username!');

      return;
    }

    try {
      // await ?
      FirebaseAuthService.sendPasswordResetEmail(email);
      alert('sent the password reset email');
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await FirebaseAuthService.logInWithGoogle();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <form style={{ maxWidth: '400px' }} onSubmit={handleLogin}>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input is-rounded"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-envelope" />
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input is-rounded"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </p>
      </div>
      <div className="buttons m-0">
        <button className="button is-dark is-rounded" type="submit">
          Sign In
        </button>
        <button
          className="button is-dark is-rounded"
          type="button"
          onClick={handleRegisterUser}
        >
          Sign Up
        </button>
        <button
          className="button is-link is-light is-rounded"
          type="button"
          onClick={handleLoginWithGoogle}
        >
          <span className="icon-text">
            <span className="icon">
              <Image src="/images/icons8-google.svg" alt="Google icon" width={96} height={96} />
            </span>
            <span>Google</span>
          </span>
        </button>
      </div>
      <button
        type="button"
        className="button is-ghost p-0 has-text-dark is-fullwidth"
        onClick={handleSendResetPasswordEmail}
      >
        Reset Password
      </button>
    </form>
  );
}
