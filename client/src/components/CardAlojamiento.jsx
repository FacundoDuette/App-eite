import React from 'react';

const CardAlojamiento = ({ imageUrl, location, distance, dateRange, price, rating }) => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={imageUrl} alt="Alojamiento" className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">{location}</span>
          <span className="text-sm text-gray-500">★ {rating}</span>
        </div>
        <p className="text-gray-500 text-sm">{distance}</p>
        <p className="text-gray-500 text-sm">{dateRange}</p>
        <p className="text-lg font-semibold mt-2">${price} noche</p>
      </div>
    </div>
  );
};

export default CardAlojamiento;