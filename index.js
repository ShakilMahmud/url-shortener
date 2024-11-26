const app = require("./src/app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`URL shortener service running on http://localhost:${PORT}`);
});
