import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'PUT') {
      return res.status(405).end();
    }
    const { catId } = req.query;
    await serverAuth(req, res);

    const cat = await prismadb.category.findUnique({
      where: {
          id: catId as string
      }
    });

    if (cat?.home === true) {
      const category = await prismadb.category.update({
        where: {
          id: catId as string
        },
        data: {
          home: false
        }
      });
    } else {
      const category = await prismadb.category.update({
        where: {
          id: catId as string
        },
        data: {
          home: true
        }
      });
    }

    return res.status(200).json(cat);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}
