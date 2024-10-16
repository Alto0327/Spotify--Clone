import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import UserPlaylists from "../components/UserPlaylists";

const spotifyApi = new SpotifyWebApi({
  clientId: "fbae3b0191774f28a48d431355216faf",
});

function Library({ accessToken }) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(
        res.body.items.map((playlist) => ({
          name: playlist.name,
          uri: playlist.uri,
          icon: playlist.images[0]?.url || '', // Handle cases where there might be no image
        }))
      );
    }).catch(err => console.error('Error fetching playlists:', err));
  }, [accessToken]);
  console.log(playlists);
  return (
    <div>
      <h1>Your Playlists</h1>
        <div>
          {playlists.map((playlist) => (
            <UserPlaylists 
              key={playlist.uri} 
              name={playlist.name} 
              icon={playlist.icon} 
            />
          ))}
        </div>
    </div>
  );
}

export default Library;
