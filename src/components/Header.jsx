import SpotifyLogo from "../assets/Spotify_Primary_Logo_RGB_White.png"
function Header() {
    return (
        <header>
            <h1>Spotify Clone</h1>
            <img src={SpotifyLogo} alt="Spotify Icon" />
        </header>
    )
}

export default Header