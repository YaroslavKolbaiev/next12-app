import React from 'react';
import PostsLayout from '../../components/PostsLayout/PostsLayout';
import { getAllPosts } from '../../helpers/db-util';
import { Posts } from '../../types/Posts';

type Props = {
  allPosts: Posts[];
};

export default function AllPostsPage({ allPosts }: Props) {
  return <PostsLayout posts={allPosts} />;
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
  };
}
