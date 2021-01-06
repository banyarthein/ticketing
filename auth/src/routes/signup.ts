import express from 'express';
const router = express.Router();

router.post('/api/users/signup', (request, response) => {
    const { email, password } = request.body;

    if (!email || typeof email !== 'string') {

    }
    // new User ({email, password})
});

export { router as signupRouter };
