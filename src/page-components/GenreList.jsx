import Genres from "../components/Genres";

function GenreList({ genres }) {
  return (
    <div>
      <h2>Genres</h2>
      <div>
        {genres.length > 0 ? (
          genres.map((genre) => (
            <Genres key={genre.name} name={genre.name} icon={genre.icon} />
          ))
        ) : (
          <p>No genres available</p>
        )}
      </div>
    </div>
  );
}

export default GenreList;
