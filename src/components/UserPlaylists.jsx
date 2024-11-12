
function UserPlaylists({ icon, name}) {
  return (
    <div className="user-playlists-item">
      <img src={icon} alt={`${name} cover`} className="user-playlists-icon" width="60px"/>
      <div className="user-playlists-text-container">
        <p className="user-playlists-name">{name}</p>
      </div>
    </div>
  );
}

export default UserPlaylists;
