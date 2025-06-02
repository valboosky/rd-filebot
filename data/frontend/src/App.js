import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

function App() {
  const [folders, setFolders] = useState([]);
  const [types, setTypes] = useState({});
  const [processing, setProcessing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${BACKEND_URL}/folders`)
      .then(res => setFolders(res.data))
      .catch(err => {
        console.error('Error fetching folders:', err);
        setMessage('❌ Failed to fetch folders');
      });
  }, []);

  const handleSelect = (name, value) => {
    setTypes(prev => ({ ...prev, [name]: value }));
  };

  const handleProcess = (folder) => {
    const type = types[folder];
    if (!type) return alert("Please select a type.");

    setProcessing(folder);
    setMessage('');

    axios.post(`${BACKEND_URL}/process`, { folderName: folder, type })
      .then(res => {
        setMessage(`✅ ${folder} processed.`);
        setFolders(folders => folders.map(f =>
          f.name === folder ? { ...f, status: 'processed' } : f
        ));
      })
      .catch(err => {
        console.error(err);
        setMessage(`❌ Failed to process ${folder}`);
      })
      .finally(() => setProcessing(null));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>RD FileBot Manager</h2>
      {folders.length === 0 && <p>Loading folders...</p>}
      <ul>
        {folders.map(folder => (
          <li key={folder.name} style={{ marginBottom: '1rem' }}>
            <strong>{folder.name}</strong> — {folder.status}
            {folder.status === 'unprocessed' && (
              <>
                <select
                  value={types[folder.name] || ''}
                  onChange={e => handleSelect(folder.name, e.target.value)}
                  style={{ marginLeft: '1rem' }}
                >
                  <option value="">Select type</option>
                  <option value="movie">Movie</option>
                  <option value="series">Series</option>
                </select>
                <button
                  onClick={() => handleProcess(folder.name)}
                  disabled={processing === folder.name}
                  style={{ marginLeft: '1rem' }}
                >
                  {processing === folder.name ? 'Processing...' : 'Process'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {message && <p><em>{message}</em></p>}
    </div>
  );
}

export default App;