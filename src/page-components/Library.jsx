import UserPlaylists from "../components/UserPlaylists";
import "../styles/Library.css";

function Library({ Playlists }) {
  return (
    <div className="library-container">
      {Playlists.map((playlist) => (
        <div key={playlist.name} className="user-playlists-container">
          <UserPlaylists
            icon={playlist.imageUrl}
            name={playlist.name}
          />
        </div>
      ))}
    </div>
  );
}

export default Library;
