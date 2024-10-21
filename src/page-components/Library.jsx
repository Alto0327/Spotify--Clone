import UserPlaylists from "../components/UserPlaylists"
function Library({Playlists}){

    return( 
        <div>
        {Playlists.map((playlist) => (
          <div key={playlist.name}>
            <UserPlaylists icon={playlist.icon} />
          </div>
        ))}
      </div>
    )
}

export default Library