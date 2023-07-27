import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { title, description, videoUrl, thumbnailUrl, duration, showId, seriesId } = req.body;
      const episode = await prismadb.episode.create({
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          duration,
          seriesId
        }
      })
      return res.status(200).json(episode);
    }
    if (req.method === 'PUT') {
      const { id, title, description, videoUrl, thumbnailUrl, duration } = req.body;
      const episode = await prismadb.episode.update({
        where: { id },
        data: {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          duration,
        }
      })
      return res.status(200).json(episode);
    }
    return res.status(405).end();
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}