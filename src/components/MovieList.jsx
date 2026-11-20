
import MovieCard from "./MovieCard";

function MovieList({ movies, onToggleWatched, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <h3>Список фільмів порожній</h3>
        <p>
          Додай свій перший фільм, щоб почати
          створювати власну колекцію!
        </p>
      </div>
    );
  }

  return (
    <section className="movies-section">
      <div className="movies-section-header">
        <div>
          <h2>🍿 Моя колекція фільмів</h2>
          <p>Зберігай улюблені фільми та відстежуй перегляди</p>
        </div>

        <span className="movies-count">
          {movies.length} фільмів
        </span>
      </div>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleWatched={onToggleWatched}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieList;
