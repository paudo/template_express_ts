import express from 'express';
export const router = express.Router();

router.get('/', (req: any, res: { send: (arg0: string) => void; }, next: any) => {
res.send('API is working properly');
});

module.exports = router;