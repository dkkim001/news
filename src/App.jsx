// App.jsx
import React from 'react';
import NewsList from './features/News/components/NewsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Google Alerts 뉴스 모음</h1>
      </header>
      <main>
        <NewsList />
      </main>
      <footer>
        <p>&copy; 2025 Google Alerts 뉴스. 모든 권리 보유.</p>
      </footer>
    </div>
  );
}

export default App;