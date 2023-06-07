import { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

type Cell = {
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  login: () => void
  logout: () => void
  postDummydata: () => void
  user: any
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const url = 'http://localhost:3000/auth/login'
  const navigate = useNavigate()
  const [user, setUser] = useState<any>()
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const lastLocationStorage = localStorage.getItem('pageData')
  useEffect(() => {
    navigate(`${lastLocationStorage}`)
  }, [])
  const [lastLocatoin, setLastLocation] = useState<string>('')
  const location = useLocation()
  const cookies = new Cookies()
  const login = async () => {
    await axios
      .post(url, { email, password })
      .then((res) => {
        const token = res.data.token

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        const decode: any = jwt(token)

        cookies.set('jwt_authorization', token, {
          expires: new Date(decode.exp * 1000),
        })
        setUser(res.data), console.log(res.data)
      })
      .catch((err) => console.log(err))

    navigate('/')
  }
  const logout = () => {
    cookies.remove('jwt_authorization')
    localStorage.clear()

    navigate('/login')
  }
  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    localStorage.setItem('pageData', location.pathname)
  }, [location])

  useEffect(() => {
    const token = cookies.get('jwt_authorization')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      setUser(jwt(token))
    }
  }, [])

  const postDummydata = async () => {
    const url = 'http://localhost:3000/blog/post'
    await axios
      .post(url, {
        title: 'title',
        dec: 'dec',
        img: 'img',
        type: 'type',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <Context.Provider
      value={{ setPassword, setEmail, login, logout, postDummydata, user }}
    >
      {children}
    </Context.Provider>
  )
}

export const UseMainContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('not wrapped')
  }
  return context
}
