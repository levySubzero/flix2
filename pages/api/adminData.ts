import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const moviesCount = await prismadb.movie.count();
    const userCount = await prismadb.user.count();
    const info = {
        "moviesCount": moviesCount,
        "userCount": userCount
    };

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
