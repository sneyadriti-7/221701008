import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function Statistics() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs") || "[]");
    setLogs(storedLogs);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={2}>Shortened URL Statistics</Typography>
      {logs.map((log, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body2">
            [{log.timestamp}] {log.message}
          </Typography>
          <pre style={{ background: "#eee", padding: "4px" }}>
            {JSON.stringify(log.data, null, 2)}
          </pre>
        </Box>
      ))}
    </Box>
  );
}

export default Statistics;
