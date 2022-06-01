import { useState } from 'react';
import Header from '../components/Header';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import ChampionshipResults from '../components/ChampionshipResults';

export default function BrazilianChampionship() {
  const navigate = useNavigate();

  const FIRST_YEAR = 2003;
  const LAST_YEAR = 2015;

  const years = Array.from({
    length: LAST_YEAR - FIRST_YEAR + 1,
  }).map((_, i) => FIRST_YEAR + i);

  const [year, setYear] = useState(years[0]);

  const handleChange = event => {
    setYear(event.target.value);
    navigate(`/${event.target.value}`);
  };

  return (
    <>
      <Header titleText="react-brazilian-championship" />
      <div className="mt-4 flex flex-col justify-center items-center">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              id="simple-select"
              value={year}
              label="Year"
              onChange={handleChange}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <ChampionshipResults />
    </>
  );
}
