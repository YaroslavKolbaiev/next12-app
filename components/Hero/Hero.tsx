import React from 'react';
import Image from 'next/image';
import classes from './Hero.module.css';

export default function Hero() {
  return (
    <section className="hero is-dark is-bold">
      <div className="hero-body has-text-centered">
        <Image
          className={classes.avatar}
          src="/images/logo.jpg"
          alt="picture displaying logo"
          width={200}
          height={200}
        />
        <p className="title has-text-grey-light">Blog App</p>
        <p className="subtitle has-text-grey-light">
          This is a test Next JS 12 fullstack blog app.
        </p>
      </div>
    </section>
  );
}
