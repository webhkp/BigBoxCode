import amqp from "amqplib"

const exchange = "bigbox.notification"
const routingKey = "user.registration"
const message = {
    type: "registration_confirm",
    text: "Registration successful. Here is the OTP - " + Date.now(),
}

let connection;
try {
    connection = await amqp.connect("amqp://bigboxuser:bigboxpass@127.0.0.1:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, "direct", { durable: false });

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

    console.log("Message Sent to Exchange '%s':", exchange, message);

    await channel.close();
} catch (err) {
    console.warn(err);
} finally {
    if (connection) await connection.close();
}