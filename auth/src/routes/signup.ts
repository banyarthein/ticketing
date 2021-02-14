import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@ticketingbnt/common';
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
    validateRequest,
    async (req: Request, res: Response) => {
        const errs = validationResult(req);

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            //console.log("Email is already exits!");
            throw new BadRequestError("Email is already in use!");
        }

        const user = User.build({ email, password });
        await user.save();

        //Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!
            //The ! marks behind the JWT_KEY let typescript know that this environment key is already checked and no need to raise error.
        );

        //console.log(userJwt);

        //Store it on session object
        req.session = {
            jwt: userJwt
        };

        //console.log(req.session);

        res.status(201).send({ user });
        // new User ({email, password})
    });

export { router as signupRouter };
