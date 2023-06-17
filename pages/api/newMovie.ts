import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { title, description, videoUrl, thumbnailUrl, genre, duration, year, subGenres, trailerUrl, cast, shortDesc} = req.body;

    const movie = await prismadb.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
        year, 
        subGenres, 
        trailerUrl, 
        cast, 
        shortDesc
      }
    })
    
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}