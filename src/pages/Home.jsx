import { useState, useEffect } from "react";
import useAuth from "../components/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";

const spotifyApi = new SpotifyWebApi({
  clientId: "fbae3b0191774f28a48d431355216faf",
});

function Home({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  
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

  return (
    <>
      <form>
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
    </>
  );
}

export default Home;
