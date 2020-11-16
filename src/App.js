import React from 'react';
import Marker from './components/Marker';

const auctions = [
  {
    id: 29979,
    eventDate: '2020-12-24T14:00',
    region: 'Івано-Франківська',
    district: 'м. Івано-Франківськ',
    locality: 'м. Івано-Франківськ',
    eventPlace: 'вул. Василіянок, 62 А',
  },
  {
    id: 29994,
    eventDate: '2020-12-24T13:00',
    region: 'Полтавська',
    district: 'м. Полтава',
    locality: 'м. Полтава',
    eventPlace: 'вул. Дмитря Коряка, будинок 3, 8-й поверх, (актова зала).',
  },
  {
    id: 29833,
    eventDate: '2020-12-24T11:00',
    region: 'Львівська',
    district: 'Старосамбірський',
    locality: 'с. Нове Місто',
    eventPlace:
      'Львівська обл., Старосамбірський р-н, с.Нове Місто, вул.Руська, 10. Початок торгів о 11.00 год. Реєстрація учасників земельних торгів в день проведення з 08-00 год. до 10-40 год.',
  },
];

const App = () => {
  const renderAuctions = auctions.map((auction, index) => {
    return <Marker key={auction.id} auction={auction} />;
  });

  return <div>{renderAuctions}</div>;
};

export default App;
