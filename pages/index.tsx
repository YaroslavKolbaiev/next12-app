import React from 'react';
import FeaturedPostsLayout from '../components/FeaturedPostsLayout/FeaturedPostsLayout';
import Hero from '../components/Hero/Hero';
import { getFeaturedPosts } from '../helpers/db-util';

import { Posts } from '../types/Posts';

type Props = {
  posts: Posts[]
};

export default function Home({ posts }: Props) {
  return (
    <>
      <Hero />
      <FeaturedPostsLayout posts={posts} adventureTitle="Featured Posts" />
    </>
  );
}

export async function getStaticProps() {
  const posts = await getFeaturedPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}
