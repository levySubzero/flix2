import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { name } = req.body;

    const category = await prismadb.category.create({
      data: {
        name
      }
    })
    
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}