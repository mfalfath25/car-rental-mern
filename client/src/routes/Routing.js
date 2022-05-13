import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'
import SearchPage from '../pages/SearchPage'
import DetailPage from '../pages/DetailPage'
import PaymentPage from '../pages/PaymentPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import Protected from '../pages/Protected'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const Data = createContext()

const Routing = () => {
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      await axios
        .get('http://localhost:5000/auth/login/success', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true,
          },
        })
        .then((res) => {
          console.log(res.data)
          setUser(res.data)
        })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  console.log('Storage data: ', user)

  return (
    <BrowserRouter>
      <Data.Provider value={{ user }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={user ? <MainPage /> : <LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/protected" element={<Protected saveUser={(user) => setUser(user)} />} />
          {user ? (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/main/search" element={<SearchPage />} />
              <Route path="/main/search/detail/:id" element={<DetailPage />} />
              <Route path="/main/pembayaran/:id" element={<PaymentPage />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <h1>404</h1>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Data.Provider>
    </BrowserRouter>
  )
}

export default Routing