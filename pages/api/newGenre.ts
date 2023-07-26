import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { name } = req.body;

      const genre = await prismadb.genre.create({
        data: {
          name
        }
      })
      return res.status(200).json(genre);
    }
    
    if (req.method === 'PUT') {
      const { id, name } = req.body;

      const genre = await prismadb.genre.update({
        where: { id },
        data: { name }
      });
      return res.status(200).json(genre);
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}