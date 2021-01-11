import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user'

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
    async (req: Request, res: Response) => {
        const errs = validationResult(req);

        if (!errs.isEmpty()) {
            //return res.status(400).send(errs.array());
            //throw new Error('Invalid email or password')
            throw new RequestValidationError(errs.array());
        }

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            //console.log("Email is already exits!");
            throw new BadRequestError("Email is already in use!");
            return res.send({});
        }

        const user = User.build({ email, password });
        await user.save();

        res.status(201).send({ user });
        // new User ({email, password})
    });

export { router as signupRouter };
