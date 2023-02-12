import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Posts } from '../../types/Posts';
import classes from './FeaturedPostsLayout.module.css';

type Props = {
  posts: Posts[];
  adventureTitle: string;
};

export default function FeaturedPostsLayout({ posts, adventureTitle }: Props) {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{adventureTitle}</h1>
        <div className="columns is-multiline">
          {posts.map(({
            _id,
            slug,
            image,
          }) => (
            <div key={_id} className="column is-one-third">

              <Link
                href={`/posts/${slug}`}
              >
                <figure className="image">
                  <Image
                    className={classes.post}
                    style={{
                      height: '260px',
                      objectFit: 'cover',
                    }}
                    src={image}
                    alt="picture of post"
                    width={300}
                    height={260}
                  />
                </figure>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
