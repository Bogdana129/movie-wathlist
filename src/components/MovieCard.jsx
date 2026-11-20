
const genreIcons = {
    Комедія: "😂",
    Драма: "🎭",
    Жахи: "👻",
    Бойовик: "💥",
    Детектив: "🔍",
    Романтика: "❤️",
    Фантастика: "🚀",
    Пригоди: "🌍",
    Трилер: "🕵️",
    Мультфільм: "🎨",
  };
  
  function MovieCard({ movie, onToggleWatched, onDelete }) {
    const { id, title, genre, watched } = movie;
  
    const genreIcon = genreIcons[genre] || "🎬";
  
    return (
      <article className={`movie-card ${watched ? "is-watched" : ""}`}>
  
        <div className="movie-card-header">
          <div className="movie-icon" aria-hidden="true">
            {genreIcon}
          </div>
  
          <span
            className={`movie-status ${
              watched ? "status-watched" : "status-pending"
            }`}
          >
            {watched ? "✓ Переглянуто" : "◷ У планах"}
          </span>
        </div>
  
        <div className="movie-card-content">
          <h3 className="movie-title">{title}</h3>
  
          <p className="movie-genre">
            <span aria-hidden="true">🎞️</span>
            {genre}
          </p>
        </div>
  
        <div className="movie-card-footer">
          <button
            type="button"
            className={`watch-button ${
              watched ? "watched-button" : ""
            }`}
            onClick={() => onToggleWatched(id)}
            aria-label={
              watched
                ? `Позначити ${title} як непереглянутий`
                : `Позначити ${title} як переглянутий`
            }
          >
            {watched ? "↩ Повернути у плани" : "✓ Переглянуто"}
          </button>
  
          <button
            type="button"
            className="delete-button"
            onClick={() => {
              if (window.confirm(`Видалити фільм «${title}»?`)) {
                onDelete(id);
              }
            }}
            aria-label={`Видалити фільм ${title}`}
            title="Видалити фільм"
          >
            🗑️
          </button>
        </div>
  
      </article>
    );
  }
  
  export default MovieCard;
  