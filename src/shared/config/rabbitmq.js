import amqp from 'amqplib'
import config from './index'
import logger from './logger'

class RabbitMQConnection{
    constructor(){
        this.connection = null;
        this.channel = null;
        this.isConnecting = false;
    }

    async connect(){
        if(this.channel){
            return this.channel;
        }

        if(this.isConnecting){
            await new Promise((resolve) =>{
                const checkInterval = setInterval(()=>{
                    if(!this.isConnecting){
                        clearInterval(checkInterval);
                        resolve()
                    }
                },100)
            })
            return this.channel
        }

        try {
            this.isConnecting = true;

            logger.info("Connecting to rabbitMQ" , config.rabbitmq.url)
            this.connection = await amqp.connect(config.rabbitmq.url);
            this.channel = await this.connection.createChannel();

            // Creating key | Queue name
            const dlqName = `${config.rabbitmq.queue}.dlq`  // api_hits | api_hits.dlq

            // DL queue
            await this.channel.assertQueue(dlqName,{
                durable: true
            })

        } catch (error) {
            this.isConnecting = false;
            logger.error("Failed to connect to RabbitMQ" , error)
            throw error
        }
    }
}