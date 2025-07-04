import Routes from "./modules/routes/routes";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(Routes);


export default app;