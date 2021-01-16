import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
    req.session = null;
    res.send({ currentUser: "logged out" });
});
export { router as signoutRouter };
