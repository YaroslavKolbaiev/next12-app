/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import classes from './Comments.module.css';
import { PostComments } from '../../types/PostComments';
import { UserContext } from '../../UserContext/UserContext';
import { createComment } from '../../helpers/commentHelpers';

type Props = {
  comments: PostComments[];
  postSlug: string;
};

export default function Comments({
  comments,
  postSlug,
}: Props) {
  const { user } = useContext(UserContext);
  const [commentText, setCommentText] = useState('');
  const [visibleComments, setVisibleComments] = useState<any>(comments);

  function addComment() {
    createComment({
      email: user?.email,
      text: commentText,
      postSlug,
      avatar: user?.photoURL,
    });
    setCommentText('');

    if (commentText.length) {
      setVisibleComments((prev: any) => [
        ...prev,
        {
          email: user?.email,
          text: commentText,
          postSlug,
          avatar: user?.photoURL,
        },
      ]);
    }
  }

  return (
    <>
      {visibleComments.map((comment: any) => (
        <article key={comment._id} className="media">
          <figure className="media-left">
            <Image
              className={classes.logoImage}
              src={!comment.avatar ? '/images/noAvatar.png' : comment.avatar}
              alt="An image showing person"
              width={64}
              height={64}
            />
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{comment.email}</strong>
                <br />
                {comment.text}
              </p>
            </div>
          </div>
        </article>
      ))}
      {user && (
        <article className="media">
          <div className="media-content">
            <div style={{ maxWidth: '400px' }} className="field">
              <p className="control">
                <textarea
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  value={commentText}
                  className="textarea"
                  placeholder="Add a comment..."
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button onClick={addComment} type="button" className="button">
                  Post comment
                </button>
              </p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
