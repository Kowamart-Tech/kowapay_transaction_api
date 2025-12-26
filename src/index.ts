import express, {type Request, type Response, type NextFunction} from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import Logger from "./middleware/log.js";
import morgan from "morgan";
import indexRouter from "./routes/index.js";

const app = express();
const port = 3000

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 1 hour.",

}));
app.use(Logger.logRequest);
app.use(morgan("combined", {
    stream: {
        write: (message) => Logger.logger.info(message.trim()),
    },
}));
app.use("/api/v1", indexRouter);


app.get("/", (req:Request, res:Response)=>{
    res.send("Kowapay Transaction API is running");
});

app.listen(3000, ()=>{
    console.log(`server running at http://localhost:${port}`);
});