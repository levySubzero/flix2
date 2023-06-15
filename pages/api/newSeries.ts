import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { title, description, thumbnailUrl, genre, year } = req.body;

    const series = await prismadb.series.create({
      data: {
        title,
        description,
        thumbnailUrl,
        genre,
        year
      }
    })
    
    return res.status(200).json(series);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}