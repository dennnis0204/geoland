import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const AreaSelect = ({
  classes,
  inputLabel,
  selectedAreaValue,
  areas,
  handleChange,
}) => {
  const renderAreas = areas.map((area, index) => {
    return (
      <MenuItem key={index} value={area.value}>
        {area.label}
      </MenuItem>
    );
  });

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="area-select-outlined-label">{inputLabel}</InputLabel>
      <Select
        labelId="area-select-outlined-label"
        id="area-select-outlined"
        value={selectedAreaValue}
        onChange={handleChange}
        label={inputLabel}
      >
        {renderAreas}
      </Select>
    </FormControl>
  );
};

export default AreaSelect;
