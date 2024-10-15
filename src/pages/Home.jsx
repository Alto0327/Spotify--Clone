import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";
import Genres from "../components/Genres";
import UserPlaylists from "../components/UserPlaylists";

const spotifyApi = new SpotifyWebApi({
  clientId: "fbae3b0191774f28a48d431355216faf",
});

function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [userData, setUserData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [Playlists, setPlaylists] = useState([]);
  
    function chooseTrack(track) {
      setPlayingTrack(track);
      setSearch(" ");
    }


  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false

    spotifyApi.searchTracks(search).then((res) => {
        if (cancel) return
      console.log(res.body)
      setSearchResults (res.body.tracks.items.map((track) => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
        };
      }))
    })

    return () => {
      cancel = true;
    };
  }, [search, accessToken]);
//TODO: genres
  useEffect(() => {
    if(!accessToken)return
    spotifyApi.getCategories().then((res) => {
      setGenres(res.body.categories.items.map((category) => {
        return {
          name: category.name,
          icon: category.icons[0].url,
      }
      }));
      console.log(res.body);
    })
  },[accessToken])


// FIXME: user data
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then((res) => {
      setUserData(res.body);
      console.log(res.body);
    });
  }, [accessToken]);

// TODO: Playlists
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getUserPlaylists().then((res) => {
      setPlaylists(res.body.items.map((playlist) => {
        return{
          name: playlist.name,
          uri: playlist.uri,
          icon: playlist.images[0].url
        }
        }));
      console.log(res.body);
    });
  }, [accessToken]);

  return (
    <>
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
            {searchResults.map(track => (
                <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
            ))}
        </div>
            <div>
            <Player accessToken={accessToken} trackUri = {playingTrack?.uri}/>
            </div>


            <div>

      {/* TODO: Genres */}
      <div>
        {genres.map(genre => (
          <div key={genre.name}>
            <Genres name={genre.name}  icon={genre.icon} />
          </div>
        ))}
      </div>
      {/* FIXME: User data */}
      <h1>Spotify User Profile</h1>
      {userData ? (
        <div>
          <img src={userData.images[0]?.url} alt="User Profile" width="100" />
          <p>{userData.country}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>

    {/* TODO: Playlists */}
    <div>
      {Playlists.map(playlist => (
        <div key={playlist.name}>
          <UserPlaylists name={playlist.name} icon={playlist.icon} />
        </div>
      ))}
    </div>
    </>
  );
}

export default Home;
