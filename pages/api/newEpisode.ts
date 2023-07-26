import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

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
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}