import React from 'react';
import { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/core/styles';

const useStylesIcon = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '200px',
  },

  auctionInfoCloseBtn: {
    textAlign: 'right',
  },
  auctionInfoTitle: {
    fontSize: 16,
  },
  auctionInfoContent: {
    color: 'grey',
  },
}));

const AreaMarker = ({ auction, handleClick }) => {
  const classesIcon = useStylesIcon();
  const classes = useStyles();

  return (
    <Marker
      latitude={auction.latitude}
      longitude={auction.longitude}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <LocationOnIcon
        className={classesIcon.root}
        onClick={() => handleClick(auction)}
        style={{ fontSize: 40 }}
      />
    </Marker>
  );
};

export default AreaMarker;
