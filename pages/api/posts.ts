import type { NextApiRequest, NextApiResponse } from 'next';
import { createPost } from '../../helpers/db-util';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const {
      slug, title, userEmail, image, excerpt,
    } = req.body;

    if (!slug || !title || !userEmail || !image || !excerpt) {
      res.status(422);
      return;
    }

    const newPost = {
      slug,
      title,
      userEmail,
      image,
      excerpt,
    };

    try {
      await createPost(newPost);
      res.revalidate('/posts');
      res.status(201);
    } catch (error) {
      res.status(500);
    }
  }
}
