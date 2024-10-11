import Header from "./components/Header"
import Playlist from "./components/Playlist"
import Player from "./components/Player"
import './styles/App.css'
import Home from './pages/Home'
import Login from "./components/Login"
import Footer from "./components/Footer"

const code = new URLSearchParams(window.location.search).get('code')
function App() {
  return code ? <Home code={code}/> : <Login/>
  
}

export default App
