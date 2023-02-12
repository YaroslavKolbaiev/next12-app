import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  totalItems: number;
};

export default function Pagination({ totalItems }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / 6); i += 1) {
    pageNumbers.push(i);
  }

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const page = searchParams.get('page') || '1';

  const prevPage = (+page - (+page > 1 ? 1 : 0)).toString();
  const nextPage = (+page + (+page < pageNumbers.length ? 1 : 0)).toString();

  const prevDisabled = +page === 1;
  const nextDisabled = +page === pageNumbers.length;

  return (
    <nav className="pagination is-centered" role="navigation">
      <ul className="pagination-list">
        <li>
          <Link
            className={classNames('pagination-previous', {
              'is-disabled': prevDisabled,
            })}
            href={{
              pathname: pathName,
              query: {
                page: prevPage,
              },
            }}
          >
            prev
          </Link>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <Link
              className={classNames('pagination-link', {
                'has-background-dark has-text-white': pageNumber === +page,
              })}
              href={{
                pathname: pathName,
                query: {
                  page: pageNumber.toString(),
                },
              }}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className={classNames('pagination-next', {
              'is-disabled': nextDisabled,
            })}
            href={{
              pathname: pathName,
              query: {
                page: nextPage,
              },
            }}
          >
            next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
