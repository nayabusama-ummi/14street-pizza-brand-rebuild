import { app } from "./app";
import { config } from "./config";

const server = app.listen(config.port, () => {
  console.log(`====================================================`);
  console.log(`🍕 14th Street Pizza API Server is running`);
  console.log(`📡 URL: http://localhost:${config.port}`);
  console.log(`📖 Swagger API Docs: http://localhost:${config.port}/api/docs`);
  console.log(`🩺 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`====================================================`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
