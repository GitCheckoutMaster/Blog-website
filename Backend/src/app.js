import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
	cors({
		origin: "blog-website-frontend-liard.vercel.app",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import articleRouter from "./routes/article.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/articles", articleRouter);

export default app;
