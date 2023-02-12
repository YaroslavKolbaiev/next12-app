import type { NextApiRequest, NextApiResponse } from 'next';
import { createComment } from '../../helpers/db-util';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const {
      email, text, postSlug, avatar,
    } = req.body;

    const newComment = {
      email,
      text,
      postSlug,
      avatar,
    };

    try {
      await createComment(newComment);
      res.revalidate(`/posts/${postSlug}`);
      res.status(201);
    } catch (error: any) {
      res.status(500).json({ name: error.message });
    }
  }
}
