import { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { storage } from './firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

type Cell = {
  setPassword: React.Dispatch<React.SetStateAction<string>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
  login: () => void
  logout: () => void
  postDummydata: () => void
  user: any

  imgUploadDrag: (e: React.DragEvent<HTMLLabelElement>) => void
  removeImgFromHtml: () => void
  image: any
  htmlImg: String | string | null
  imgUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadFileToFirebaseStorage: () => void
  imgUrl: string
  setHtmlImg: React.Dispatch<React.SetStateAction<String | null>>
  navigate: NavigateFunction
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  //image upload

  const [image, setImage] = useState<any>(null)
  const [htmlImg, setHtmlImg] = useState<String | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!image) {
      let newImg = image
      let newHtmlImg = htmlImg
      if (e.target.files) {
        newImg = e.target.files[0]
        newHtmlImg = URL.createObjectURL(e.target.files[0])
        setImage(newImg)
        setHtmlImg(newHtmlImg)
      }
    }
  }

  const imgUploadDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    let newImg = image
    let newHtmlImg = htmlImg
    newImg = e.dataTransfer.files[0]
    newHtmlImg = URL.createObjectURL(e.dataTransfer.files[0])
    setImage(newImg)
    setHtmlImg(newHtmlImg)
  }

  const removeImgFromHtml = () => {
    setImage(null)
    setHtmlImg(null)
  }
  const uploadFileToFirebaseStorage = async () => {
    if (image) {
      const storageRef = ref(storage, 'forum/' + image.name)
      setLoading(true)
      setError('')
      try {
        const snapshot = await uploadBytesResumable(storageRef, image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        setImgUrl(downloadURL)
        setLoading(false)
        console.log('succsess')

        removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    } else {
      setError('Please Select The File!')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }
  /// login and navigation ///////////////////////////////////////////////////////////////
  const location = useLocation()
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')

  const navigate = useNavigate()

  // store current location in local storage
  const lastLocationStorage = localStorage.getItem('pageData')
  useEffect(() => {
    // if location storage is not clean navigate to last route that user was in
    if (lastLocationStorage !== `/null`) {
      navigate(`${lastLocationStorage}`)
    }
    // if user token does not exists in cookies navigate user to login page
    if (!token) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    // if location.pathname does not exists DON'T !!!  set the locat storage
    if (location.pathname !== null) {
      localStorage.setItem('pageData', location.pathname)
    }
  }, [location])
  // re setting headers every time browser re freshes for back end authentication
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.defaults.headers.common['Content-Type'] = 'application/json'
      setUser(jwt(token))
    }
  }, [])
  //login functionality //////////////
  const url = 'http://localhost:3000/auth/login'

  const [user, setUser] = useState<any>()
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
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
  //logout
  const logout = () => {
    cookies.remove('jwt_authorization')
    localStorage.clear()

    navigate('/login')
  }
  // useEffect(() => {
  //   console.log(user)
  // }, [user])

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
      value={{
        setPassword,
        setEmail,
        login,
        logout,
        postDummydata,
        user,
        removeImgFromHtml,
        imgUploadDrag,
        imgUpload,
        image,
        htmlImg,
        uploadFileToFirebaseStorage,
        imgUrl,
        setHtmlImg,
        navigate,
      }}
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
