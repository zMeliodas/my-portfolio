import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing.");
}

const generateAdminToken = (
  adminId: number,
  username: string,
) => {
  return jwt.sign(
    {
      adminId,
      username,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export { generateAdminToken };