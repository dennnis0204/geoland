import React from 'react';
import Map from './components/Map';
import Amplify, { API } from 'aws-amplify';
import RegionDistrictForm from './components/RegionDistrictForm';

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
      oblast: oblast,
      region_start_with: region_start_with,
    },
  });
};

const auctions = [
  {
    id: 29979,
    eventDate: '2020-12-24T14:00',
    region: 'Івано-Франківська',
    district: 'м. Івано-Франківськ',
    locality: 'м. Івано-Франківськ',
    eventPlace: 'вул. Василіянок, 62 А',
    latitude: 47.94,
    longitude: 32.12,
  },
  {
    id: 29994,
    eventDate: '2020-12-24T13:00',
    region: 'Полтавська',
    district: 'м. Полтава',
    locality: 'м. Полтава',
    eventPlace: 'вул. Дмитря Коряка, будинок 3, 8-й поверх, (актова зала).',
    latitude: 47.94,
    longitude: 31.76,
  },
  {
    id: 29833,
    eventDate: '2020-12-24T11:00',
    region: 'Львівська',
    district: 'Старосамбірський',
    locality: 'с. Нове Місто',
    eventPlace:
      'Львівська обл., Старосамбірський р-н, с.Нове Місто, вул.Руська, 10. Початок торгів о 11.00 год. Реєстрація учасників земельних торгів в день проведення з 08-00 год. до 10-40 год.',
    latitude: 47.89,
    longitude: 32.28,
  },
];

const App = () => {
  const fetchDistrictAuctions = async (regionName, districtName) => {
    const requestData = { oblast: regionName, region_start_with: districtName };
    const districtAuctions = await getDataFromRegions(requestData);
    console.log(districtAuctions);
  };

  const handleRegionDistrictFormSubmit = (region, district) => {
    const regionName = `#${region.name}`;
    const districtName = `#${district.name}`;
    if (region.value !== 'noneRegion' && district.value !== 'noneDistrict') {
      fetchDistrictAuctions(regionName, districtName);
    }
  };

  return (
    <div>
      <Map auctions={auctions} />
      <RegionDistrictForm handleOnSubmit={handleRegionDistrictFormSubmit} />
    </div>
  );
};

export default App;
