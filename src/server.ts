import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(` API Docs available at http://localhost:${PORT}/api-docs`);
});
