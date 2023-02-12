import type { NextApiRequest, NextApiResponse } from 'next';
import { createContact } from '../../helpers/db-util';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const newContact = {
      name,
      email,
      message,
    };

    try {
      await createContact(newContact);
      res.status(201);
    } catch (error) {
      res.status(500);
    }
  }
}
