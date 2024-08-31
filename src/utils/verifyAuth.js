// JWT
import jwt from "jsonwebtoken";
const jwtSecret = import.meta.env.JWT_SECRET;

// FUNCTIONS
export const isLoggedIn = (token) => {
    if (!token) {
        return false;
    }

    const { value } = token;

    if (typeof value !== "string" || !value.trim()) {
        return false;
    }

    if (!jwtSecret) {
        return false;
    }

    try {
        const decoded = jwt.verify(value, jwtSecret);
        if (decoded) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
