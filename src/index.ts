import http from 'http';
import 'dotenv/config';
import { router } from './routes/router';

const PORT = process.env.PORT || 3500;

const server = http.createServer(router);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
