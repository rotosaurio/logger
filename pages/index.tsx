import { useState, useEffect } from 'react';
import Image from 'next/image';

const publicacionesChihuahua = [
  {
    autor: "María González",
    tiempo: "1 h",
    contenido: "¡Hermosa tarde en la Plaza Mayor de Chihuahua! 🌅 El clima está perfecto para un café en el centro.",
    imagen: "https://images.unsplash.com/photo-1584559582128-b8be739912e1",
    likes: "43",
    comentarios: "12",
    compartidos: "3"
  },
  {
    autor: "Carlos Ramírez",
    tiempo: "3 h",
    contenido: "Visitando las Grutas de Nombre de Dios, un tesoro escondido de Chihuahua. ¡Impresionante! 🏔️",
    imagen: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223",
    likes: "127",
    comentarios: "28",
    compartidos: "15"
  },
  {
    autor: "Ana Martínez",
    tiempo: "5 h",
    contenido: "Probando los mejores burritos de Chihuahua en Villa Ahumada. ¡No hay como la comida de aquí! 🌯",
    imagen: "https://images.unsplash.com/photo-1584208632869-05fa2b2a5934",
    likes: "89",
    comentarios: "17",
    compartidos: "7"
  }
];

export default function Home() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(coords);

          try {
            await fetch('/api/log-location', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(coords),
            });
          } catch (err) {
            console.error('Error:', err);
          }
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <header className="bg-white shadow-sm fixed w-full top-0 z-50 h-14">
        <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center">
            <svg height="40" width="40" viewBox="0 0 36 36">
              <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 25h-3v-6h3v-3.056c0-3.692 2.249-5.944 5.94-5.944 1.691 0 2.94.12 2.94.12v3.24H20.5c-1.886 0-2.5.792-2.5 2.312V19h4l-1 6h-3l.181 10.87z" fill="#1877F2"/>
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
            </div>
            <span className="font-semibold text-[#050505]">Chihuahua Social</span>
          </div>
        </div>
      </header>

      <main className="pt-16 px-4 max-w-[680px] mx-auto">
        <div className="bg-white rounded-lg shadow mb-4 p-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"/>
            <input
              type="text"
              placeholder="¿Qué está pasando en Chihuahua?"
              className="w-full bg-[#F0F2F5] rounded-full py-2.5 px-4 text-[15px] hover:bg-gray-100 cursor-pointer"
              readOnly
            />
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-200">
            <button className="flex items-center justify-center space-x-2 flex-1 hover:bg-gray-50 py-2 rounded-lg">
              <svg className="w-6 h-6 text-[#45BD62]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-[#65676B] font-medium">Video en vivo</span>
            </button>
            <button className="flex items-center justify-center space-x-2 flex-1 hover:bg-gray-50 py-2 rounded-lg">
              <svg className="w-6 h-6 text-[#45BD62]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-3-3h-2v-2h2v2zm-4 0H9v-2h2v2zm4-4h-2v-2h2v2zm-4 0H9v-2h2v2z"/>
              </svg>
              <span className="text-[#65676B] font-medium">Foto/video</span>
            </button>
          </div>
        </div>

        {publicacionesChihuahua.map((post, index) => (
          <div key={index} className="bg-white rounded-lg shadow mb-4">
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200"/>
                <div>
                  <p className="font-semibold text-[#050505]">{post.autor}</p>
                  <p className="text-[13px] text-[#65676B]">{post.tiempo}</p>
                </div>
              </div>
              <p className="text-[15px] mb-3">{post.contenido}</p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src={post.imagen}
                alt={post.contenido}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-[#65676B] text-[15px] mb-3">
                <div className="flex items-center space-x-1">
                  <span className="flex items-center justify-center w-5 h-5 bg-[#1877F2] rounded-full">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                    </svg>
                  </span>
                  <span>{post.likes}</span>
                </div>
                <div className="flex space-x-3">
                  <span>{post.comentarios} comentarios</span>
                  <span>{post.compartidos} veces compartido</span>
                </div>
              </div>
              <div className="flex border-t border-b border-gray-200 -mx-4 px-4">
                <button className="flex items-center justify-center space-x-2 flex-1 py-3 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.89 5.86l-3.59 3.59c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l3.59-3.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0z"/>
                    <path d="M20 12c0-4.42-3.58-8-8-8s-8 3.58-8 8 3.58 8 8 8 8-3.58 8-8zm-2 0c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"/>
                  </svg>
                  <span className="font-semibold text-[#65676B]">Me gusta</span>
                </button>
                <button className="flex items-center justify-center space-x-2 flex-1 py-3 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <span className="font-semibold text-[#65676B]">Comentar</span>
                </button>
                <button className="flex items-center justify-center space-x-2 flex-1 py-3 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-[#65676B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                  </svg>
                  <span className="font-semibold text-[#65676B]">Compartir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
