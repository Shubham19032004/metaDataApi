import jwt from 'jsonwebtoken';

export default function generateAccessToken({ email, id }) {
    return jwt.sign(
        {
            _id: id,
            email: email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
}
