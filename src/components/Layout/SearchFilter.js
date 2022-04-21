import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { FiUsers } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchItems } from '../../redux/actions/itemActions';
import { getYear } from '../../utils/getYear';

const SearchFilter = (props) => {
  const dataCar = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tipeMobil, setTipeMobil] = useState('');
  const [ukuranMobil, setUkuranMobil] = useState('');
  const [tahunMobil, setTahunMobil] = useState('');
  const [jumlahPenumpang, setJumlahPenumpang] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const handleTipeMobil = (value) => {
    setTipeMobil(value);
    console.log(value);
  };

  const handleUkuranMobil = (value) => {
    setUkuranMobil(value);
    console.log(value);
  };

  const handleTahunMobil = (value) => {
    setTahunMobil(value);
    console.log(value);
  };

  const handleJumlahPenumpang = (value) => {
    setJumlahPenumpang(value);
    console.log(value);
  };

  const searchData = { tipeMobil, ukuranMobil, tahunMobil, jumlahPenumpang };

  const getSearchPage = (props) => {
    const path = `search`;
    const verifyPath = '/main/search';
    console.log('dari getSearch page:', props);
    // eslint-disable-next-line no-unused-vars
    const checkPath = location.pathname !== verifyPath ? navigate(path) : '';
  };

  return (
    <>
      <Box
        className="search-filter"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '1100px', height: '70px' }}>
          <Grid container spacing={2} columns={{ sm: 9 }}>
            <Grid item xs={2}>
              <Box>
                <Typography>Nama Mobil</Typography>
                <Box sx={{ width: '210px' }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={props.disabled}
                      value={tipeMobil}
                      onChange={(e) => handleTipeMobil(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dataCar?.map((item) => (
                        <MenuItem value={item.name} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Typography>Ukuran Mobil</Typography>
                <Box sx={{ width: '210px' }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={props.disabled}
                      value={ukuranMobil}
                      onChange={(e) => handleUkuranMobil(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dataCar?.map((item) => (
                        <MenuItem value={item.type} key={item.id}>
                          {item.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Typography>Tahun Mobil</Typography>
                <Box sx={{ width: '210px' }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={props.disabled}
                      value={tahunMobil}
                      onChange={(e) => handleTahunMobil(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dataCar?.map((item) => (
                        <MenuItem value={item.time} key={item.id}>
                          {getYear(item.time)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Typography>Jumlah Penumpang (optional)</Typography>
                <Box sx={{ width: '210px' }}>
                  <FormControl fullWidth>
                    <Select
                      disabled={props.disabled}
                      value={jumlahPenumpang}
                      onChange={(e) => handleJumlahPenumpang(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dataCar?.map((item) => (
                        <MenuItem value={item.passenger} key={item.id}>
                          {item.passenger}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ mt: 'auto', mb: '0.25rem' }}>
              <Button
                disabled={props.disabled}
                variant="contained"
                sx={{ fontWeight: 'bold', background: '#5CB85F' }}
                onClick={() => {
                  props.searchFilter(searchData);
                  console.log(searchData);
                  getSearchPage(searchData);
                }}
              >
                Cari Mobil
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default SearchFilter;
