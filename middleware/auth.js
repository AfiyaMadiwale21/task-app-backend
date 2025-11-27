import jwt from "jsonwebtoken";
export default function auth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: "no token" });
    try {
        const decode = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decode.id;
        next();
    }
    catch {
        res.status(401).json({ message: "invalid token" });
    }
}