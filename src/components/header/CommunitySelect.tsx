import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
}

export const CommunitySelect: FC<Props> = () => {
  const [community, setCommunity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCommunity(event.target.value);
  };

  useEffect(() => {
    // fetch community
  }, [community])

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 145 }}>
        <InputLabel id="community-select-label">Communauté</InputLabel>
        <Select
          labelId="community-select-label"
          id="demo-simple-select-helper"
          value={community}
          label="Communauté"
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
};
