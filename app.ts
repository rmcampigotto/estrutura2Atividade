import express from 'express';
import mongoose from "mongoose";
import routes from "./routes";

class App{
    public express = express.application
    
    public constructor(){
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware(): void{
        this.express.use(express.json())
    }

    private async database(){
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect('mongodb://0.0.0.0:27017/atividadeEstrutura')
            console.log("Database Connection: SUCCESS")
        } catch (error) {
            console.error("Database Connection: ERROR -> " + error)
        }
    }

    private routes(): void{
        this.express.use(routes)
    }
}

export default new App().express