import SpotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png"
import "../styles/Header.css"
function Header({userData, search, setSearch}) {

  return( 
      <div className="header-container">
      <img src={SpotifyLogo} alt="Logo" width="50"/>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          <input
            className="search-bar"
            type="text"
            placeholder="What do you want to play?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </form>




          {userData ?(
            <div className="profile-container">
              <p>Welcome, {userData.display_name} !</p>
              <img src={userData.images[0].url} alt="Profile Picture" width="50" className="profile-picture" />
              </div>
          ) : (
            <p>Loading UserData...</p>
          )}
      </div>
  )
}

export default Header