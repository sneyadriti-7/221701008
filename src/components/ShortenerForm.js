import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Grid
} from "@mui/material";
import { customLogger } from "../utils/logger";

const MAX_URLS = 5;

function ShortenerForm() {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAddField = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const payload = urls.map((u) => ({
      url: u.url,
      validity: u.validity || 30,
      shortcode: u.shortcode || undefined
    }));

    try {
      // Replace with actual backend call
      customLogger.log("Shorten Request Sent", payload);

      // Fake response for now
      const shortened = payload.map((item, i) => ({
        ...item,
        shortened: `http://localhost:3000/${item.shortcode || `short${i}`}`,
        expiresAt: new Date(Date.now() + (item.validity || 30) * 60000)
      }));

      setResults(shortened);
      customLogger.log("Shorten Response", shortened);
    } catch (err) {
      customLogger.log("Shorten Error", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>URL Shortener</Typography>
      {urls.map((entry, i) => (
        <Paper key={i} sx={{ mb: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="URL"
                fullWidth
                required
                value={entry.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Validity (mins)"
                type="number"
                fullWidth
                value={entry.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={entry.shortcode}
                onChange={(e) => handleChange(i, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box display="flex" gap={2}>
        <Button variant="contained" onClick={handleAddField} disabled={urls.length >= MAX_URLS}>
          Add More
        </Button>
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Results:</Typography>
        {results.map((res, i) => (
          <Box key={i} mb={1}>
            <strong>{res.shortened}</strong> (expires at {new Date(res.expiresAt).toLocaleTimeString()})
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ShortenerForm;
