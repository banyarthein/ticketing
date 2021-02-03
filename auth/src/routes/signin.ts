import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { validateRequest, BadRequestError } from '@ticketingbnt/common';
import { User } from '../models/user';
import { Password } from '../services/password';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage("Email must be valid"),
        body('password')
            .trim()
            .notEmpty()
            .withMessage("Password cannot be empty")

    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invlaid User Name or Password");
        }

        const isMatch = await Password.compare(existingUser.password, password);
        if (!isMatch) {
            throw new BadRequestError("Invlaid User Name or Password");
        }

        //Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!
            //The ! marks behind the JWT_KEY let typescript know that this environment key is already checked and no need to raise error.
        );

        //console.log(userJwt);

        //Store it on session object
        req.session = {
            jwt: userJwt
        };

        //console.log(req.session);

        res.status(200).send({ existingUser });

    });


export { router as signinRouter };
