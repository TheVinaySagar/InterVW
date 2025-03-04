import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const secret = process.env.SECRET;

class UserController {
    static async register(req, res) {
        try {
            const user = new User(req.body);
            await user.save();

            const token = jwt.sign(
                { _id: user._id },
                secret,
                { expiresIn: '24h' }
            );

            const userObject = user.toObject();
            delete userObject.password;

            res.status(201).send({ user: userObject, token });
        } catch (error) {
            res.status(400).send({
                error: 'Unable to register user',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).send({
                    error: 'Email and password are required'
                });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({
                    error: 'Authentication failed'
                });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).send({
                    error: 'Authentication failed'
                });
            }

            const token = jwt.sign(
                { _id: user._id },
                secret,
                { expiresIn: '24h' }
            );

            const userObject = user.toObject();
            delete userObject.password;

            res.send({ user: userObject, token });
        } catch (error) {
            res.status(500).send({
                error: 'Server error',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}

export default UserController;
