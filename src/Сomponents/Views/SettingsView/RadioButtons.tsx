import React, { Dispatch, SetStateAction, useState } from 'react';
import { FormControl, Radio, FormControlLabel, makeStyles } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';

type Props = {
  setValues: Dispatch<SetStateAction<{ section: number; difficult: string }>>;
};

const useStyles = makeStyles({
  root: {
    color: '#2C98F0',
    '&$checked': {
      color: '#2C98F0',
    },
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontWeight: 400,
    fontSize: 16,
  },
  labelPlacement: {
    marginLeft: 30,
  },
  formRoot: {
    paddingTop: 26,
  },
});

const RadioButtons: React.FC<Props> = ({ setValues }) => {
  const [selectedValue, setSelectedValue] = useState('7000');
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);
    setValues((prevState) => ({
      ...prevState,
      difficult: e.currentTarget.value,
    }));
  };

  return (
    <FormControl
      classes={{
        root: classes.formRoot,
      }}
    >
      <RadioGroup
        onChange={handleChange}
        value={selectedValue}
        classes={{
          root: classes.buttonGroup,
        }}
      >
        <FormControlLabel
          classes={{
            label: classes.label,
            labelPlacementBottom: classes.labelPlacement,
          }}
          value="7000"
          control={<Radio color="default" className={classes.root} />}
          label="легкий"
          labelPlacement="bottom"
        />
        <FormControlLabel
          classes={{
            label: classes.label,
          }}
          value="5000"
          control={<Radio color="default" className={classes.root} />}
          label="средний"
          labelPlacement="bottom"
        />
        <FormControlLabel
          classes={{
            label: classes.label,
          }}
          value="3000"
          control={<Radio color="default" className={classes.root} />}
          label="сложный"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
