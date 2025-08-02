// App.jsx
import React from 'react';
import NewsList from './features/News/components/NewsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>News Balance</h1>
      </header>
      <main>
        <NewsList />
      </main>
      <footer>
        <p>&copy; News Balance.</p>
      </footer>
    </div>
  );
}

export default App;