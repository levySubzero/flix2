import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { seriesId } = req.query;
    await serverAuth(req, res);
    if (typeof seriesId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!seriesId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
      const episodes = await prismadb.episode.findMany({
        where: {
          seriesId: seriesId 
        }
      });
      
      if (!episodes) {
          throw new Error('Invalid Id');
      }

      return res.status(200).json(episodes);
    } else {
      return res.status(405).end();
    }
    

    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
