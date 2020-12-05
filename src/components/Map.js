import React from 'react';
import { useState } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import AreaMarker from './AreaMarker';

const useStylesIcon = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    '& a': {
      fontSize: '11px',
      color: 'black',
      '&:link': {
        textDecoration: 'none',
      },
    },
    maxWidth: '150px',
    cursor: 'default',
  },
  auctionInfoTitle: {
    fontSize: 13,
  },
  auctionInfoContent: {
    fontSize: 12,
    color: 'grey',
  },
  a: {
    fontSize: '11px',
    '&:link': {
      textDecoration: 'none',
    },
  },
}));

const Map = ({ auctions }) => {
  // styles
  const classes = useStyles();
  const classesIcon = useStylesIcon();

  // states
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: auctions[0].latitude,
    longitude: auctions[0].longitude,
    zoom: 8,
  });

  const [showPopup, setShowPopup] = React.useState(false);

  const [selectedAuction, setSelectedAuction] = React.useState(null);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleClick = (auction) => {
    setShowPopup(false);
    setSelectedAuction(auction);
    setShowPopup(true);
  };

  const renderAreaMarkers = auctions.map((auction, index) => {
    return (
      <AreaMarker key={index} auction={auction} handleClick={handleClick} />
    );
  });

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={
        'pk.eyJ1IjoiZGVubm5pczAyMDQiLCJhIjoiY2tocWx3ejBjMGxubzJycnN6OWJpcjYyciJ9.Yd1ZTrPSgP1nBJPOsRuLSw'
      }
    >
      {renderAreaMarkers}
      {showPopup && (
        <Popup
          latitude={selectedAuction.latitude}
          longitude={selectedAuction.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
          anchor="top"
        >
          <Box className={classes.root}>
            <div className={classes.auctionInfoTitle}>Номер аукціона</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.id}
            </div>
            <div className={classes.auctionInfoTitle}>Дата проведення</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.eventDate}
            </div>
            <div className={classes.auctionInfoTitle}> Область</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.region}
            </div>
            <div className={classes.auctionInfoTitle}> Район</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.district}
            </div>
            <div className={classes.auctionInfoTitle}>Населений пункт</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.locality}
            </div>
            <div className={classes.auctionInfoTitle}>Місце проведення</div>
            <div className={classes.auctionInfoContent}>
              {selectedAuction.eventPlace}
            </div>
            <div>
              <a href="http://torgy.land.gov.ua/auction">сайт КАДАСТР 2.0</a>
            </div>
          </Box>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
