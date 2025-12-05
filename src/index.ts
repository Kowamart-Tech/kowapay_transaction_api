import express, {type Request, type Response, type NextFunction} from "express";


const app = express();
const port = 3000



app.get("/", (req:Request, res:Response)=>{
    res.send("Kowapay Transaction API is running");
});

app.listen(3000, ()=>{
    console.log(`server running at http://localhost:${port}`);
});