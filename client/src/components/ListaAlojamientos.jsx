import React from 'react';
import CardAlojamiento from './CardAlojamiento';

const ListaAlojamientos = () => {
  // Ejemplo de datos de alojamientos (puedes reemplazarlos con datos reales o de un backend)
  const alojamientos = [
    {
      imageUrl: 'https://via.placeholder.com/300', // reemplaza con una URL real de imagen
      location: 'Atyrá, Paraguay',
      distance: 'A 46 kilómetros de distancia',
      dateRange: '9 al 14 de nov.',
      price: 42,
      rating: 4.91,
    },
    {
      imageUrl: 'https://via.placeholder.com/300',
      location: 'San Bernardino, Paraguay',
      distance: 'A 33 kilómetros de distancia',
      dateRange: '9 al 14 de nov.',
      price: 201,
      rating: 4.8,
    },
    {
        imageUrl: 'https://via.placeholder.com/300',
        location: 'San Bernardino, Paraguay',
        distance: 'A 33 kilómetros de distancia',
        dateRange: '9 al 14 de nov.',
        price: 201,
        rating: 4.8,
      },
      {
        imageUrl: 'https://via.placeholder.com/300',
        location: 'San Bernardino, Paraguay',
        distance: 'A 33 kilómetros de distancia',
        dateRange: '9 al 14 de nov.',
        price: 201,
        rating: 4.8,
      },
      {
        imageUrl: 'https://via.placeholder.com/300',
        location: 'San Bernardino, Paraguay',
        distance: 'A 33 kilómetros de distancia',
        dateRange: '9 al 14 de nov.',
        price: 201,
        rating: 4.8,
      }
    // Agrega más alojamientos aquí
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex space-x-4 overflow-x-scroll pb-4">
        {alojamientos.map((alojamiento, index) => (
          <CardAlojamiento key={index} {...alojamiento} />
        ))}
      </div>
    </div>
  );
};

export default ListaAlojamientos;