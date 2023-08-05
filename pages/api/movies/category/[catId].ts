import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { categoryId } = req.query;
    await serverAuth(req, res);
    
    if (typeof categoryId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!categoryId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
     

      const movies = await prismadb.movie.findMany({
        where: {
            categoryId: categoryId
        },
        take: 10,
      });

      if (!movies) {
          throw new Error('Invalid Id');
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