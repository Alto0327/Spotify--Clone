import Header from "./components/Header"
import Playlist from "./components/Playlist"
import Player from "./components/Player"
import './styles/App.css'
import Home from './pages/Home'

function App() {


  return (
    <>
      <Header/>
      <Playlist/>
        <Home/> 
        {/* HOME PROFILE AND SEARCH WOULD BE INTERCHANGEABLE */}
      <Player/>
   </>
  )
}

export default App
