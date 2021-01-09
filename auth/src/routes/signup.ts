import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please provide valid Email.'),
        body('password')
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters.'),
    ],
    (req: Request, res: Response) => {
        const errs = validationResult(req);

        if (!errs.isEmpty()) {
            //return res.status(400).send(errs.array());
            //throw new Error('Invalid email or password')
            throw new RequestValidationError(errs.array());
        }

        const { email, password } = req.body;
        console.log('Creating a user...');
        throw new DatabaseConnectionError();

        res.send({});
        // new User ({email, password})
    });

export { router as signupRouter };
