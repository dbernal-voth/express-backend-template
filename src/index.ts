import config from "./config";
import createServer from "./server";

const app = createServer();

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
