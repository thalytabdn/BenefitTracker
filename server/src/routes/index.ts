import express, {Request, Response} from 'express';
import { login, fetchData, searchInElasticsearch, ping} from '../controllers';

const router = express.Router();

router.post('/login', login);
router.get('/consulta-beneficios', fetchData);
router.get('/search', searchInElasticsearch);

router.get('/ping', ping);

export default router;
