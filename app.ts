import express, { Request, Response, NextFunction } from "express";
import consola from "consola";
import Config from "./Config";
import cors from "cors";

//Server Initialization
const app = express();

//Server Configurations
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:5173"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API routes starts here

//Default routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/",(req: Request, res: Response, next: NextFunction) => {
    res.send({
		data: {
			appName: "Starter Pack | Backend",
			developedBy: "Aditya Choudhury",
			maintainedBy: "Aditya Choudhury",
			version: "1.0.0.0",
		},
		success: true,
	});
});

//Health check API
app.get("/health", (req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message:"Server is up and running"
	})
});

// Default not-found route
app.use((req: Request, res: Response, next: NextFunction) => {
	res.send({
		reason: "invalid-request",
		message:
			"The endpoint you wanna reach is not available! Please check the endpoint again",
		success: false,
	});
});


const port = Config.PORT || 5000;
	app.listen(port, () => {
		consola.success({
			message: `Server is running at http://localhost:${port}`,
			badge: true,
		});
	});