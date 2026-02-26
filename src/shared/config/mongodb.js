import mongoose from "mongoose";
import config from "./index";
import logger from "./logger";

// we are following singleton design pattern 

/**
 * Mongodb database manager/connector
 */
class MongoConnection {
    constructor(){
        this.connection = null;
    }

    /**
     * Connect to mongoDB
     * @returns {Promise<mongoose.Connection>}
     */
    async connect(){
        try {
            if(this.connection){
                logger.info("Mongodb already connected");
                return this.connection
            }

            await mongoose.connect(config.mongo.uri,{
                dbName: config.mongo.dbName
            })

            this.connection = mongoose.connection;

            logger.info(`Mongodb connected: ${config.mongo.uri}`);

            this.connection.on("error" , err =>{
                logger.error("Mongodb connection error" , err);
            })

            this.connection.on("disconnected" , () =>{
                logger.error("Mongodb disconnected");
            })

            return this.connection
        } catch (error) {
            logger.error("Failed to connect to mongoDb: " , error);
            throw error;
        }
    }

    async disconnect(){
        try {
            if(this.connection){
                await mongoose.disconnect();
                this.connection = null;
                logger.info("Mongo db disconnected successfully");
            }
        } catch (error) {
            logger.error("Failed to disconnect to mongoDb: " , error);
            throw error;
        }
    }

    getConnection(){
        return this.connection;
    }
}

export default new MongoConnection();