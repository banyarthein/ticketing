import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (request, response) => {
    response.send("Hi Thar Khit Lay!");
});
export { router as currentUserRouter };
