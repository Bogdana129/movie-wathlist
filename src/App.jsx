
import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "./App.css";

const initialMovies = [
  { id: 1, title: "Інтерстеллар", genre: "Фантастика", watched: false },
  { id: 2, title: "Титанік", genre: "Романтика", watched: true },
  { id: 3, title: "Ножі наголо", genre: "Детектив", watched: false },
  { id: 4, title: "1+1", genre: "Комедія", watched: true },
];

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem("movie-watchlist");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error("Помилка читання фільмів:", error);
    }
    return initialMovies;
  });

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Драма");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    try {
      localStorage.setItem("movie-watchlist", JSON.stringify(movies));
    } catch (error) {
      console.error("Помилка збереження фільмів:", error);
    }
  }, [movies]);

  function addMovie(event) {
    event.preventDefault();

    const cleanTitle = title.trim();

    if (cleanTitle.length < 2) {
      alert("Введіть назву фільму (мінімум 2 символи).");
      return;
    }

    const newMovie = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      genre,
      watched: false,
    };

    setMovies((previous) => [newMovie, ...previous]);
    setTitle("");
    setGenre("Драма");
    setFilter("all");
  }

  function toggleWatched(id) {
    setMovies((previous) =>
      previous.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  }

  function deleteMovie(id) {
    setMovies((previous) =>
      previous.filter((movie) => movie.id !== id)
    );
  }

  const watchedCount = movies.filter((movie) => movie.watched).length;
  const pendingCount = movies.length - watchedCount;

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "pending") return !movie.watched;
    return true;
  });

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <span className="hero-badge">🎬 Твій кінопростір</span>
          <h1>Movie Watchlist</h1>
          <p>
            Збирай улюблені фільми, плануй перегляди
            та створюй власну кіноколекцію.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="stats-grid">
          <div className="stat-card">
            <span>🎞️ Усього фільмів</span>
            <strong>{movies.length}</strong>
          </div>

          <div className="stat-card">
            <span>✅ Переглянуто</span>
            <strong>{watchedCount}</strong>
          </div>

          <div className="stat-card">
            <span>🍿 Планую переглянути</span>
            <strong>{pendingCount}</strong>
          </div>
        </section>

        <section className="add-movie-section">
          <h2>✨ Додати новий фільм</h2>
          <p>Який фільм хочеш додати до своєї колекції?</p>

          <form className="movie-form" onSubmit={addMovie}>
            <div className="form-group">
              <label htmlFor="movie-title">Назва фільму</label>
              <input
                id="movie-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Наприклад, Початок"
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="movie-genre">Жанр</label>
              <select
                id="movie-genre"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              >
                {[
                  "Драма", "Комедія", "Романтика",
                  "Детектив", "Трилер", "Жахи",
                  "Бойовик", "Фантастика",
                  "Пригоди", "Мультфільм",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="add-button">
              + Додати фільм
            </button>
          </form>
        </section>

        <div className="filter-bar">
          <h2>Мої фільми</h2>

          <div className="filter-buttons">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              Усі
            </button>

            <button
              type="button"
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              У планах
            </button>

            <button
              type="button"
              className={filter === "watched" ? "active" : ""}
              onClick={() => setFilter("watched")}
            >
              Переглянуті
            </button>
          </div>
        </div>

        <MovieList
          movies={filteredMovies}
          onToggleWatched={toggleWatched}
          onDelete={deleteMovie}
        />
      </main>

      <footer className="footer">
        🎬 Movie Watchlist — твоя особиста кіноколекція
      </footer>
    </div>
  );
}

export default App;

