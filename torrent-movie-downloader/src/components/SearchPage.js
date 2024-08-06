import React, { useState } from 'react'; // test
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material'; 
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const url = `https://movie_torrent_api1.p.rapidapi.com/search/${encodeURIComponent(query)}`;

    const options = {
      method: 'GET',
      url: url,
      headers: {
        'x-rapidapi-key': '5f834ba477msh534b5b3fbdb9afbp1554b2jsna46e8def9c31',
        'x-rapidapi-host': 'movie_torrent_api1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data); 
      if (response.data.status === 'success') {
        setResults(response.data.data || []);
      } else {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Torrent Search
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TextField
          label="Search torrents"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Paper>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {results.length > 0 ? (
          results.map((result, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={result.title}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Provider:</strong> {result.provider}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Time:</strong> {new Date(result.time).toLocaleDateString()} {new Date(result.time).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Size:</strong> {result.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Seeds:</strong> {result.seeds} <strong>Peers:</strong> {result.peers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Category:</strong> {result.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>IMDB:</strong> <a href={`https://www.imdb.com/title/${result.imdb}`} target="_blank" rel="noopener noreferrer">{result.imdb}</a>
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      onClick={() => window.location.href = result.magnet}
                      style={{ marginTop: '10px' }}
                    >
                      Download Torrent
                    </Button>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          !loading && <Typography>No results found</Typography>
        )}
      </List>
    </div>
  );
};

export default SearchPage;
