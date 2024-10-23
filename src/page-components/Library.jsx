import UserPlaylists from "../components/UserPlaylists"
import "../styles/Library.css"
function Library({Playlists}){

    return( 
        <div className="library-container">
        {Playlists.map((playlist) => (
          <div key={playlist.name}>
            <UserPlaylists icon={playlist.icon} name={playlist.name}/>
          </div>
        ))}
      </div>
    )
}

export default Library