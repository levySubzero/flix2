import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { seriesId } = req.query;
    // await serverAuth(req, res);
      console.log('raw', seriesId);
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
      const series = await prismadb.series.findMany({
        where: {
          showId: seriesId
        }
      });
      series.map(async (serie) => {
        const eps = await prismadb.episode.findMany({
          where: {
            seriesId: seriesId
          }
        });
        eps.map(async (ep) => {
          const deleted = await prismadb.episode.delete({
            where: {
              id: ep.id
            }
          })
        })
        const deletedData = await prismadb.series.delete({
          where: {
            id: serie.id
          }
        });
      })
      const deletedData = await prismadb.show.delete({
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
