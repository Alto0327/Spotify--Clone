import SpotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png"
import "../styles/Header.css"
function Header({userData, search, setSearch}) {

  return( 
      <div className="header-container">
      <img src={SpotifyLogo} alt="Logo" width="100"/>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Search songs
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>




          {userData ?(
            <div>
              <img src={userData.images[0].url} alt="tada" width="100" />
              <p>Welcome, {userData.display_name} !</p>
              </div>
          ) : (
            <p>Loading UserData...</p>
          )}
      </div>
  )
}

export default Header