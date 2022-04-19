import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { FiUsers, FiSettings, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setButton, fetchItems } from '../../redux/actions/itemActions';

const ItemCard = (props) => {
  const bt = useSelector((state) => state.buttonText.buttonText);
  const data = useSelector((state) => state.items.items);
  // console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setButton('Pilih Mobil'));
    dispatch(fetchItems());
  });

  const handleCard = (id) => {
    const path = `detail/${id}`;
    navigate(path);
  };

  const dateFormat = (time) => {
    const date = new Date(time);
    const options = {
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      {typeof data !== 'undefined' ? (
        data
          ?.filter((item) => item.name.includes(props.search))
          .map((item) => (
            <Grid item xs={4} key={item.id}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  height: '100%',
                  maxWidth: '333px',
                }}
              >
                <Box
                  sx={{
                    m: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardContent sx={{ p: '8px' }}>
                    <img className="card-img" src={item.image} alt="card-img" />
                    <Typography variant="body1">
                      {item.name} / {item.type}
                    </Typography>

                    <Typography
                      sx={{ fontSize: '18px', fontWeight: 'bold', my: 1 }}
                    >
                      Rp. {Number(item.price).toLocaleString()} / hari
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FiUsers />
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {item.passenger} orang
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FiSettings />
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {item.model}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <FiCalendar />
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        Tahun {dateFormat(item.time)}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ mt: 'auto' }}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      sx={{
                        fontWeight: 'bold',
                        background: '#5CB85F',
                      }}
                      onClick={() => handleCard(item.id)}
                    >
                      {bt}
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))
      ) : (
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ItemCard;
