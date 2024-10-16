import './styles/App.css'
import Home from './pages/Home'
import Login from "./components/Login"

const code = new URLSearchParams(window.location.search).get('code')
function App() {
  return code ? <Home code={code}/> : <Login/>
  
}

export default App
