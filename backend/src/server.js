import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



// middleware
app.use(express.json()); // parse JSON bodies: req.body
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(rateLimiter); // simple custom rate limiter



app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on PORT:", PORT);
    });
});

