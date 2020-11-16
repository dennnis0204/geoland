import React from 'react';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';

const useStylesIcon = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
  },
}));

const useStylesPopover = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    maxWidth: '400px',
  },
}));

const useStyles = makeStyles((theme) => ({
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

const Marker = ({ auction }) => {
  const classesIcon = useStylesIcon();
  const classesPopover = useStylesPopover();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <LocationOnIcon
        className={classesIcon.root}
        aria-describedby={id}
        onClick={handleClick}
        style={{ fontSize: 60 }}
      />
      <Popover
        className={classesPopover.root}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={`${classesPopover.typography}`}>
          <div className={classes.auctionInfoCloseBtn}>
            <CloseIcon className={classesIcon.root} onClick={handleClose} />
          </div>
          <div className={classes.auctionInfoTitle}>Номер аукціона</div>
          <div className={classes.auctionInfoContent}>{auction.id}</div>
          <div className={classes.auctionInfoTitle}>Дата проведення</div>
          <div className={classes.auctionInfoContent}>{auction.eventDate}</div>
          <div className={classes.auctionInfoTitle}> Область</div>
          <div className={classes.auctionInfoContent}>{auction.region}</div>
          <div className={classes.auctionInfoTitle}> Район</div>
          <div className={classes.auctionInfoContent}>{auction.district}</div>
          <div className={classes.auctionInfoTitle}>Населений пункт</div>
          <div className={classes.auctionInfoContent}>{auction.locality}</div>
          <div className={classes.auctionInfoTitle}>Місце проведення</div>
          <div className={classes.auctionInfoContent}>{auction.eventPlace}</div>
        </Typography>
      </Popover>
    </div>
  );
};

export default Marker;
