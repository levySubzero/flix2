import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { catId } = req.query;
    await serverAuth(req, res);
    
    if (typeof catId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!catId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
     
      const list = await prismadb.category.findUnique({
        where: {
          id: catId
        }
      });

      const movies = await prismadb.movie.findMany({
        where: {
          id: {
            in: list?.movieIds
          }
        },
        take: 5,
      });

      if (!movies) {
        throw new Error('Not');
      }

      return res.status(200).json(movies);
    } else {
      return res.status(405).end();
    }
    

    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
