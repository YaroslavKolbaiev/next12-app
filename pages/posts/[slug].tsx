import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';
import LoadingComp from '../../components/LoadingComp/LoadingComp';
import { getAllPosts, getComments } from '../../helpers/db-util';
import { PostComments } from '../../types/PostComments';
import { Posts } from '../../types/Posts';

const DynamicComments = dynamic(() => import('../../components/Comments/Comments'));

type Props = {
  post: Posts,
  comments: PostComments[],
};

export default function PostPage({ post, comments }: Props) {
  if (!post) {
    return <LoadingComp />;
  }

  const {
    slug,
    image,
    title,
    excerpt,
    userEmail,
  } = post;

  return (
    <section className="hero">
      <div className="hero-head">
        <h1 className="title has-text-centered">{title}</h1>
        <figure className="has-text-centered">
          <Image src={image} alt="picture of post" width={500} height={500} />
        </figure>
      </div>
      <div className="hero-body">
        <div className="content">
          <p>
            <strong>{userEmail}</strong>
            <br />
            {excerpt}
          </p>
        </div>
        <hr />
        <DynamicComments
          postSlug={slug}
          comments={comments}
        />
      </div>
    </section>
  );
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const { slug } = params;

  const posts: Posts[] = await getAllPosts();
  const comments: PostComments[] = await getComments(slug);

  const post = posts.find((selectedPost) => selectedPost.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      comments,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const pathParams = posts.map((post: Posts) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths: pathParams,
    fallback: true,
  };
}
