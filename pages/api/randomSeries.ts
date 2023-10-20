import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // await serverAuth(req, res);

    const seriesCount = await prismadb.show.count();
    const randomIndex = Math.floor(Math.random() * seriesCount);

    const randomseries = await prismadb.show.findMany({
      take: 1,
      skip: randomIndex
    });

    return res.status(200).json(randomseries[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
