import React from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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

const Map = ({ auction }) => {
  // variables
  const latitude = 48.3;
  const longitude = 32.16;

  // styles
  const classes = useStyles();
  const classesIcon = useStylesIcon();

  // states
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude,
    longitude,
    zoom: 12,
  });
  const [showPopup, setShowPopup] = useState(false);

  // event handlers
  const handleClick = (event) => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <ReactMapGL
      onClick={handleClose}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={
        'pk.eyJ1IjoiZGVubm5pczAyMDQiLCJhIjoiY2tocWx3ejBjMGxubzJycnN6OWJpcjYyciJ9.Yd1ZTrPSgP1nBJPOsRuLSw'
      }
    >
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <LocationOnIcon
          className={classesIcon.root}
          onClick={handleClick}
          style={{ fontSize: 40 }}
        />
      </Marker>
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={handleClose}
          anchor="top"
        >
          <Box className={classes.root}>
            <div className={classes.auctionInfoTitle}>Номер аукціона</div>
            <div className={classes.auctionInfoContent}>{auction.id}</div>
            <div className={classes.auctionInfoTitle}>Дата проведення</div>
            <div className={classes.auctionInfoContent}>
              {auction.eventDate}
            </div>
            <div className={classes.auctionInfoTitle}> Область</div>
            <div className={classes.auctionInfoContent}>{auction.region}</div>
            <div className={classes.auctionInfoTitle}> Район</div>
            <div className={classes.auctionInfoContent}>{auction.district}</div>
            <div className={classes.auctionInfoTitle}>Населений пункт</div>
            <div className={classes.auctionInfoContent}>{auction.locality}</div>
            <div className={classes.auctionInfoTitle}>Місце проведення</div>
            <div className={classes.auctionInfoContent}>
              {auction.eventPlace}
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
