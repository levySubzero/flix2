import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, description, categoryId, thumbnailUrl, genreId, year, subGenres, trailerUrl, cast, shortDesc} = req.body;
      const show = await prismadb.show.create({
        data: {
          title,
          description,
          thumbnailUrl,
          genreId,
          year, 
          categoryId,
          subGenres, 
          trailerUrl, 
          cast, 
          shortDesc
        }
      });
      await prismadb.category.update({
        where: {
          id: categoryId,
        },
        data: {
          showIds: {
            push: show.id
          }
        }
      });
      return res.status(200).json(show);  
    }
    if (req.method === 'PUT') {
      const { id, title, description, categoryId, thumbnailUrl, genreId, year, subGenres, trailerUrl, cast, shortDesc} = req.body;
      const show = await prismadb.show.update({
        where: { id },
        data: {
          title,
          description,
          thumbnailUrl,
          genreId,
          year, 
          categoryId,
          subGenres, 
          trailerUrl, 
          cast, 
          shortDesc
        }
      });
      return res.status(200).json(show);  
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}