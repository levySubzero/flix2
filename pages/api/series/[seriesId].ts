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
     

      const series = await prismadb.series.findMany({
        where: {
          showId: seriesId
        }
      });

      if (!series) {
          throw new Error('Invalid Id');
        }

      return res.status(200).json(series);
    } else if (req.method === 'DELETE') {
      // Delete the data by ID
      const deletedData = await prismadb.movie.delete({
        where: {
          id: seriesId
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
