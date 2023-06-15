import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { episodeId } = req.query;
    await serverAuth(req, res);

    if (typeof episodeId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!episodeId) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
     

      const episode = await prismadb.episode.findUnique({
        where: {
          id: episodeId
        }
      });

      if (!episode) {
          throw new Error('Invalid Id');
        }

      return res.status(200).json(episode);
    } else if (req.method === 'DELETE') {
      // Delete the data by ID
      const deletedData = await prismadb.episode.delete({
        where: {
          id: episodeId
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
