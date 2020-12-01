import React from 'react';
import Map from './components/Map';
import Amplify, { API } from 'aws-amplify';

Amplify.configure({
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_ENDPOINT, // (optional) - AWS AppSync endpoint
    aws_appsync_authenticationType: process.env.REACT_APP_AUTH_TYPE, // (optional) - Primary AWS AppSync authentication type
    aws_appsync_apiKey: process.env.REACT_APP_API_KEY, // (optional) - AWS AppSync API Key
  });

const getPlacesByOblastRegion = `query GetPlacesByOblastRegion($oblast: String, $region_start_with: String) {
  getPlacesByOblastRegion(oblast: $oblast, region_start_with: $region_start_with) {
    oblast
    region
    area
    kadastr_num
    lat
    long
    place
    previousId
    place
  }
}`;

const getDataFromRegions = async (input) => {
  const { oblast, region_start_with } = input;
  return await API.graphql({
    query: getPlacesByOblastRegion,
    variables: {
      "oblast": oblast,
      "region_start_with": region_start_with
    }
  });
}



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
  const handleOnClick = async () => {
    // if you set region_start_with to '#' response will contain data from all regions in selected oblast
    const input = { oblast: "#Полтавська", region_start_with: "#Кр" };
    const dataFromRegions = await getDataFromRegions(input);
    console.log(dataFromRegions);
  }
  return (
    <div>
      <button onClick={handleOnClick}>Button</button>
      <Map auction={auctions[2]} />
    </div>
  );
};

export default App;
