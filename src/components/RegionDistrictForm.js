import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AreaSelect from './AreaSelect';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const regions = [
  {
    value: 'noneRegion',
    label: 'Виберіть область',
    districts: [{ value: 'noneDistrict', label: 'Виберіть район' }],
  },
  {
    value: 'kirovohrad',
    label: 'Кіровоградська',
    districts: [
      { value: 'bobrynets', label: 'Бобринецький' },
      { value: 'dobrovelychkivka', label: 'Добровеличківський ' },
    ],
  },
  {
    value: 'dnipropetrovsk',
    label: 'Дніпропетровська',
    districts: [
      { value: 'petrykivka', label: 'Петриківський' },
      { value: 'vasylkivka', label: 'Васильківський' },
    ],
  },
];

const RegionDistrictForm = ({ handleOnSubmit }) => {
  const classes = useStyles();
  const [region, setRegion] = React.useState(regions[0]);
  const [district, setDistrict] = React.useState(regions[0].districts[0]);

  const handleChangeRegion = (event) => {
    const region = regions.find((region) => {
      return region.value === event.target.value;
    });

    setRegion(region);
    setDistrict(region.districts[0]);
  };

  const handleChangeDistrict = (event) => {
    const district = region.districts.find((district) => {
      return district.value === event.target.value;
    });

    setDistrict(district);
  };

  return (
    <div>
      <AreaSelect
        classes={classes}
        inputLabel="Область"
        handleChange={handleChangeRegion}
        selectedAreaValue={region.value}
        areas={regions}
      />
      <AreaSelect
        classes={classes}
        inputLabel="Район"
        handleChange={handleChangeDistrict}
        selectedAreaValue={district.value}
        areas={region.districts}
      />
      <Button
        onClick={() => handleOnSubmit(region, district)}
        variant="contained"
        color="primary"
      >
        Шукати
      </Button>
    </div>
  );
};

export default RegionDistrictForm;
