import React, { useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { FiUsers, FiSettings, FiCalendar } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItem, setButton } from '../../redux/actions/itemActions'
import { getYear } from '../../utils/getYear'
import { formatDate } from '../../utils/formatDate'

const ItemCardDetail = () => {
  const bt = useSelector((state) => state.buttonText.buttonText)
  const data = useSelector((state) => state.selectedItem)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const param = useParams()

  useEffect(() => {
    dispatch(setButton('Lanjutkan pembayaran'))
    if (id !== '') dispatch(fetchItem(id))
  })

  return (
    <>
      <Grid item sx={{ mb: '4rem' }}>
        <Card variant="outlined" sx={{ maxWidth: '333px' }}>
          <Box sx={{ m: '20px' }}>
            <CardContent sx={{ p: 0 }}>
              <img
                src={`/uploads/${data.image}`}
                alt="card-img"
                style={{ width: '100%', maxHeight: 240 }}
              />
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold', my: 1 }}>
                {data.name} / {data.type}
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
                  {data.passenger} orang
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
                  {data.model}
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
                  {formatDate(data.startRent)} - {formatDate(data.finishRent)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="body1" sx={{ mb: 1, mt: 4 }}>
                  Total
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1, mt: 4 }}>
                  Rp. {Number(data.price).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
            {/* <CardActions>
              <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{ fontWeight: 'bold', background: '#5CB85F' }}
                // onClick={navigate(`/main/pembayaran/${data._id}`)}
              >
                {bt}
              </Button>
            </CardActions> */}
          </Box>
        </Card>
      </Grid>
    </>
  )
}

export default ItemCardDetail
