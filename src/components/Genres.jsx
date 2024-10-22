function Genres({ icon, name }) {
  return (
    <div className="genres">
      <div>
        <h3>{name}</h3>
      </div>
      <div className="genres-icon">
        <img src={icon} alt="tada" width="150" />
      </div>
    </div>
  );
}

export default Genres;
