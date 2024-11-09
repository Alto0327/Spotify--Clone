import UserPlaylists from "../components/UserPlaylists";
import "../styles/Library.css";
function Library({ Playlists }) {
  return (
    <div className="library-container">
      {Playlists.map((playlist) => (
        <div key={playlist.name} className="user-playlists-container">
            <UserPlaylists icon={playlist.icon} />
            {/* FIXME: All this should be inside userPlaylists */}

          <div className="user-playlists-Text-container">
            <p className="user-playlists-name">{playlist.name}</p>
            <p>{playlist.owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Library;
