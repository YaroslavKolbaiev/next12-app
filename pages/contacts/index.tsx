import React from 'react';
import dynamic from 'next/dynamic';

const DynamicContacts = dynamic(() => import('../../components/Contacts/Contacts'));

export default function Contact() {
  return (
    <h1>
      <section className="section">
        <div className="container is-flex is-justify-content-center">
          <DynamicContacts />
        </div>
      </section>
    </h1>
  );
}
