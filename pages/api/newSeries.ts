import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, description, year, cast, thumbnailUrl, trailerUrl, showId } = req.body;
      const series = await prismadb.series.create({
        data: {
          title,
          description,
          thumbnailUrl,
          year,
          cast,
          trailerUrl,
          showId
        }
      })    
      return res.status(200).json(series);
      
    }
    if (req.method === 'PUT') {
      const { id, title, description, year, cast, thumbnailUrl, trailerUrl, showId } = req.body;
      const series = await prismadb.series.update({
        where: { id },
        data: {
          title,
          description,
          thumbnailUrl,
          year,
          cast,
          trailerUrl,
          showId
        }
      })    
      return res.status(200).json(series);
      
    }

    return res.status(405).end();
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}