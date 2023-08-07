import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { catId } = req.query;
  try {
    await serverAuth(req, res);
    
    if (typeof catId !== 'string') {
      console.log(typeof catId);
      throw new Error('Invalid Id');
    }

    if (!catId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
     

      const shows = await prismadb.show.findMany({
        where: {
            categoryId: catId
        },
        take: 10,
      });

      if (!shows) {
        throw new Error('Not');
      }

      return res.status(200).json(shows);
    } else {
      return res.status(405).end();
    }
    

    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
