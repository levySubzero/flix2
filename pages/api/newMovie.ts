import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, description, videoUrl, categoryId, thumbnailUrl, genreId, duration, year, subGenres, trailerUrl, cast, shortDesc} = req.body;
      const movie = await prismadb.movie.create({
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genreId,
          duration,
          year, 
          categoryId,
          subGenres, 
          trailerUrl, 
          cast, 
          shortDesc
        }
      });
      
      const cate = await prismadb.category.update({
        where: {
          id: categoryId,
        },
        data: {
          movieIds: {
            push: movie?.id
          }
        }
      });
      
      return res.status(200).json(movie);
    }
    if (req.method === 'PUT') {
      const { id, title, description, videoUrl, categoryId, thumbnailUrl, genreId, duration, year, subGenres, trailerUrl, cast, shortDesc} = req.body;
      const movie = await prismadb.movie.update({
        where: { id },
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          genreId,
          duration,
          year, 
          categoryId,
          subGenres, 
          trailerUrl, 
          cast, 
          shortDesc
        }
      });
      return res.status(200).json(movie);
    }
    return res.status(405).end();

    
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}