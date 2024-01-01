import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // await serverAuth(req, res);

    const categories = await prismadb.category.findMany();

    return res.status(200).json(categories);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
