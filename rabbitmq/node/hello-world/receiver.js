import amqp from "amqplib"

const exchange = "bigbox.notification"
const routingKey = "user.registration"
const queue = "registration_queue"

let connection;
try {
    connection = await amqp.connect("amqp://bigboxuser:bigboxpass@127.0.0.1:5672")
    const channel = await connection.createChannel()

    // Ensure the exchange exists
    await channel.assertExchange(exchange, "direct", { durable: false })

    // Create or connect to the queue
    const q = await channel.assertQueue(queue, { durable: false })

    // Bind queue to the exchange with the routing key
    await channel.bindQueue(q.queue, exchange, routingKey)

    console.log(`Waiting for messages in ${q.queue}. To exit press CTRL+C`)

    // Consume messages
    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            const content = msg.content.toString()
            console.log("Received message: %s", content)
            channel.ack(msg)
        }
    })
} catch (err) {
    console.warn("Error:", err)
}
