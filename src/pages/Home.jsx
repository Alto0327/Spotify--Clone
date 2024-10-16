import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "../components/Player";
import GenresList from "../page-components/GenreList";
import Header from "../page-components/Header";
import Library from "../page-components/Library.jsx";
import '../styles/Home.css'

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
    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      console.log(res.body);
      setSearchResults(
        res.body.tracks.items.map((track) => {
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
        })
      );
    });

    return () => {
      cancel = true;
    };
  }, [search, accessToken]);
  //TODO: genres
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getCategories().then((res) => {
      setGenres(
        res.body.categories.items.map((category) => {
          return {
            name: category.name,
            icon: category.icons[0].url,
          };
        })
      );
      console.log(res.body);
    });
  }, [accessToken]);

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
      setPlaylists(
        res.body.items.map((playlist) => {
          return {
            name: playlist.name,
            uri: playlist.uri,
            icon: playlist.images[0].url,
          };
        })
      );
      console.log(res.body);
    });
  }, [accessToken]);
  
  return (
    <>
      <div className="Container">
        <Header
          code={code}
          userData={userData}
          search={search}
          setSearch={setSearch}
        />
        <GenresList genres={genres} />
        <Library code={code} Playlists={Playlists} />
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </>
  );
}

export default Home;
