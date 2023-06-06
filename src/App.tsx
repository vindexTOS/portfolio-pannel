import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LogIn from './pages/auth/LogIn'
import MainBlogScreen from './pages/screen/BlogScreens/MainBlogScreen'
import MakeBlogPostScreen from './pages/screen/BlogScreens/MakeBlogPostScreen'
import PostsScreen from './pages/screen/BlogScreens/PostsScreen'
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="blog" element={<MainBlogScreen />}>
          <Route path="make" element={<MakeBlogPostScreen />} />
          <Route path="posts" element={<PostsScreen />} />
        </Route>
      </Route>
      <Route path="/login" element={<LogIn />} />
    </Routes>
  )
}

export default App
