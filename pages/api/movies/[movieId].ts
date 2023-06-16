import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { movieId } = req.query;
    await serverAuth(req, res);
    
    console.log(movieId)
    console.log("how1")

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
     

      const movies = await prismadb.movie.findUnique({
        where: {
          id: movieId
        }
      });

      if (!movies) {
          throw new Error('Invalid Id');
        }

      return res.status(200).json(movies);
    } else if (req.method === 'DELETE') {
      // Delete the data by ID
      const deletedData = await prismadb.movie.delete({
        where: {
          id: movieId
        }
      });

      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      return res.status(405).end();
    }
    

    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
