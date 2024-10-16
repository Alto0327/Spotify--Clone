import SpotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png";

function Header({ userData, search, setSearch }) {
  return (
    <div>
      <h1>Spotify Clone</h1>
      <img src={SpotifyLogo} alt="Spotify Icon" width="100" />

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

      <div>
        <h1>Spotify User Profile</h1>
        {userData ? (
          <div>
            {userData.images && userData.images.length > 0 ? (
              <img
                src={userData.images[0]?.url}
                alt="User Profile"
                width="100"
              />
            ) : (
              <p>No profile image</p>
            )}
            <p>{userData.country}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default Header;
