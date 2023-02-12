import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, {
  useMemo,
} from 'react';
import { Posts } from '../../types/Posts';
import Pagination from '../Pagination/Pagination';
import classes from './PostsLayout.module.css';

type Props = {
  posts: Posts[];
};

export default function PostsLayout({ posts }: Props) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const totaItems = useMemo(() => posts.length, [posts]);

  const indexOfLastItem = +currentPage * 6;
  const indexOfFirstItem = indexOfLastItem - 6;
  const paginationIsDisabled = posts.length <= 6;

  const visiblePosts: Posts[] = posts.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">All posts</h1>
        <div className="columns is-multiline">
          {visiblePosts.map(({
            _id, slug, image,
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
                    height={300}
                  />
                </figure>
              </Link>
            </div>
          ))}
        </div>
        {!paginationIsDisabled && <Pagination totalItems={totaItems} />}
      </div>
    </section>
  );
}
