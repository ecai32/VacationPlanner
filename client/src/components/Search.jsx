import React, { useEffect, useState } from "react";
import {
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import clsx from "clsx";
import { search } from "./api";

const Search = ({ setCityCode }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const { process, cancel } = search(inputValue);

    process((options) => {
      setOptions(options);
    });

    return () => cancel();
  }, [inputValue]);

  return (
    <div>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo
        disableClearable
        blurOnSelect
        clearOnBlur
        options={options}
        onChange={(event, newValue) => {
          setCityCode(newValue.code);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.city || ""}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <PinIcon className={clsx(classes.icon, classes.optionIcon)} />
              </Grid>
              <Grid item xs>
                <span className={classes.cityName}>{option.city}</span>
                <Typography variant="body2" color="textSecondary">
                  {option.country}
                  {option.state ? `, ${option.state}` : ""}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </div>
  );
};

export { Search };