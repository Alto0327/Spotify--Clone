function UserPlaylists ({icon, name}) {

    return(
        <div className="user-playlists-container">
           <img src={icon} alt="tada" width="80" className="user-playlists-icon"/>
           <p className="user-playlists-name">{name}</p>
        </div>
    )
    
    }
    
    export default UserPlaylists