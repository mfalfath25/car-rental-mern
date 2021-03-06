import React, { useEffect, useState } from 'react'
import { FormControl, OutlinedInput, Button, Typography, Alert, Box, Link, Stack, LinearProgress } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const LoginForm = () => {
  const navigate = useNavigate()
  const BaseURL = 'http://localhost:5000'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({
    info: '',
    type: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`${BaseURL}/protected`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res)
        navigate('/protected')
      })
      .catch((err) => {
        // console.log(err)
        navigate('/login')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    await axios
      .post(`${BaseURL}/login`, { email, password })
      .then((user) => {
        console.log(user)
        if (!loading) {
          setLoading(true)
          setTimeout(() => {
            setMessage({ info: 'Login Successful: 200 Success', type: 'success' })
          }, 1000)
          setTimeout(() => {
            localStorage.setItem('token', user.data.token)
            navigate('/protected')
          }, 2000)
        }
      })
      .catch((err) => {
        console.log('CATCH:', err)
        if (err.response.status === 401) {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setMessage({
              info: 'Invalid credentials: 401 Unauthorized',
              type: 'warning',
            })
          }, 1000)
        }
      })
  }

  const googleAuth = () => {
    window.open('http://localhost:5000/auth/google', '_self')
  }

  const githubAuth = () => {
    window.open('http://localhost:5000/auth/github', '_self')
  }

  return (
    <div className="LoginForm">
      {message.type ? (
        <Alert
          severity={message.type}
          sx={{ mb: 2 }}
          onClose={() => {
            setMessage({ info: '', type: '' })
          }}
        >
          {message.info}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Typography variant="h6">Email</Typography>
          <OutlinedInput
            id="email-input"
            type="email"
            name="email"
            placeholder="Contoh: johndee@gmail.com"
            size="small"
            onChange={(event) => setEmail(event.target.value)}
            role="input-email"
          />
        </FormControl>
        <FormControl fullWidth>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Password
          </Typography>
          <OutlinedInput
            id="pass-input"
            type="password"
            name="password"
            placeholder="6+ Karakter"
            size="small"
            onChange={(event) => setPassword(event.target.value)}
            role="input-password"
          />
        </FormControl>
        <Box sx={{ position: 'relative' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1,
              fontWeight: 'bold',
            }}
            role="button-login"
          >
            Sign In
          </Button>
          {loading && (
            <LinearProgress
              size={24}
              sx={{
                color: '#1a90ff',
                position: 'absolute',
                width: '100%',
                bottom: '0',
              }}
            />
          )}
        </Box>
      </form>
      <Stack spacing={2} sx={{ pt: 2 }}>
        <Link href="register" underline="hover">
          {'Create account? Register'}
        </Link>
        <Button variant="outlined" startIcon={<FcGoogle />} onClick={googleAuth}>
          Sign In with Google
        </Button>
        <Button variant="outlined" startIcon={<FaGithub />} onClick={githubAuth}>
          Sign In with Github
        </Button>
      </Stack>
    </div>
  )
}

export default LoginForm
