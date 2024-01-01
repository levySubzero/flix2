import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    // await serverAuth(req, res);

    if (typeof id !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!id) {
      throw new Error('Missing Id');
    }
    if (req.method == 'GET') {
      const series = await prismadb.series.findUnique({
        where: {
          id
        }
      });

      if (!series) {
          throw new Error('Invalid Id');
        }

      return res.status(200).json(series);
    }
    return res.status(405).end();
    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
