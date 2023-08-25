import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import { string } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { query } = req.query;;
      console.log(query);
      try {
        if (query && query.length > 0) {
          const searchResults = await prismadb.show.findMany({
            where: {
              OR: [
                { title: { contains: query as string, mode: 'insensitive' } },
                // Add more conditions for other fields if needed
              ],
            },
          });
  
          res.status(200).json({ results: searchResults });
        } else {
          res.status(400).json({ error: 'Invalid query' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}