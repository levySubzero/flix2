import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const { genreId } = req.query;
    await serverAuth(req, res);

    const genre = await prismadb.genre.findUnique({
        where: { id : genreId as string }
    });

    return res.status(200).json(genre);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
