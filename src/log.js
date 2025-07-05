export const customLogger = {
  log: (message, data) => {
    // Custom logging instead of console.log
    const timestamp = new Date().toISOString();
    const entry = { timestamp, message, data };
    // Store in localStorage for simplicity (or send to server if needed)
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push(entry);
    localStorage.setItem("logs", JSON.stringify(logs));
  }
};
