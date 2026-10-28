import React, { useState } from 'react';
import { Search, Star, Film, X, Play, Heart, Calendar, Tag } from 'lucide-react';

const MOVIE_DATA = [
  {
    id: 1,
    title: 'Inception',
    year: '2010',
    rating: '8.8',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
    director: 'Christopher Nolan',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt'
  },
  {
    id: 2,
    title: 'Interstellar',
    year: '2014',
    rating: '8.7',
    genre: 'Sci-Fi',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    description: 'Explorers travel through a wormhole in space to ensure humanity\'s survival.',
    director: 'Christopher Nolan',
    cast: 'Matthew McConaughey, Anne Hathaway'
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: '2008',
    rating: '9.0',
    genre: 'Action',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    description: 'Batman faces his greatest psychological and physical test against the Joker.',
    director: 'Christopher Nolan',
    cast: 'Christian Bale, Heath Ledger'
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: '1994',
    rating: '8.9',
    genre: 'Crime',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800',
    description: 'The lives of two mob hitmen, a boxer, and a gangster intertwine.',
    director: 'Quentin Tarantino',
    cast: 'John Travolta, Uma Thurman'
  }
];

const GENRES = ['All', 'Sci-Fi', 'Action', 'Crime'];

function MovieCard({ movie, onSelect }) {
  const [liked, setLiked] = useState(false);

  return (
    <div 
      onClick={() => onSelect(movie)}
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
      }}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(0,0,0,0.6)',
          border: 'none',
          borderRadius: '50%',
          padding: '8px',
          cursor: 'pointer',
          color: liked ? '#ef4444' : '#fff',
          zIndex: 2
        }}
      >
        <Heart size={18} fill={liked ? '#ef4444' : 'none'} />
      </button>

      <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>
            {movie.genre}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <Star size={16} fill="#f59e0b" />
            <span>{movie.rating}</span>
          </div>
        </div>
        <h3 style={{ margin: '0 0 4px 0', color: '#f8fafc', fontSize: '1.1rem' }}>{movie.title}</h3>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>{movie.year}</p>
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: '#1e293b', borderRadius: '16px', maxWidth: '600px', width: '100%', overflow: 'hidden', position: 'relative', color: '#f8fafc'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', padding: '8px', cursor: 'pointer', zIndex: 10
        }}>
          <X size={20} />
        </button>

        <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />

        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 10px 0' }}>{movie.title} ({movie.year})</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.5', marginBottom: '20px' }}>{movie.description}</p>
          <p style={{ margin: '4px 0', color: '#94a3b8' }}><strong>Director:</strong> {movie.director}</p>
          <p style={{ margin: '4px 0', color: '#94a3b8' }}><strong>Cast:</strong> {movie.cast}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filteredMovies = MOVIE_DATA.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: '30px 40px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Film size={30} color="#3b82f6" />
          <h1 style={{ margin: 0, fontSize: '1.6rem' }}>CineVault</h1>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{ backgroundColor: selectedGenre === genre ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}
          >
            {genre}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
        ))}
      </div>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}