import { useState, useEffect } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import { Avatar } from "@material-ui/core";

const SelectLand = ({
  setCountryInfo,
  countries,
  setMapCenter,
  setMapZoom,
  onContryChange,
  countrySelected,
}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "200px",
        justifyContent: "space-evenly",
      }}
    >
      <SelectImg src={`${PF}/corona/global.png`} />
      <FormControl>
        <Select
          variant="standard"
          value={countrySelected}
          onChange={(e) => onContryChange(e.target.value)}
          disableUnderline
          style={{ fontSize: "20px", fontWight: "500" }}
        >
          <MenuItem value="worldwide">World wide</MenuItem>
          {countries.map((country, index) => (
            <MenuItem key={index} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLand;

const SelectImg = styled.img`
  width: 60px;
  height: 60px;
`;
