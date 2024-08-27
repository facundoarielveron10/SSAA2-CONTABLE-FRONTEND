import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const jwtSecret = import.meta.env.JWT_SECRET;

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

export const getUser = (token) => {
    if (!token) {
        return null;
    }

    const { value } = token;

    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    try {
        const decoded = jwtDecode(value);
        return decoded;
    } catch (error) {
        return null;
    }
};
