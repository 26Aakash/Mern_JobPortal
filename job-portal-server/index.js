require("dotenv").config();

const app = require("./server");
const { connectToDatabase } = require("./config/db");

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`Career Tracker API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
