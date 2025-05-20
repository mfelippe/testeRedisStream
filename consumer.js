import { createClient } from "redis";
import dotenv from "dotenv";
const { config } = dotenv;
config();

const run = async () => {
  const messages = [];
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      tls:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: true }
          : { rejectUnauthorized: false },
    },
    // password: process.env.REDIS_PASSWORD,
  });

  client.on("error", (err) => console.error("Erro no Redis:", err));

  await client.connect();

  const streamKey = "meu_topico";
  let lastId = "$"; // Começa ouvindo só novas mensagens

  while (true) {
    const response = await client.xRead(
      {
        key: streamKey,
        id: lastId,
      },
      { COUNT: 1, BLOCK: 0 }
    );

    if (response) {
      for (const stream of response) {
        for (const msg of stream.messages) {
          const mensagemRecebida = {
            id: msg.id,
            ...msg.message,
          };

          messages.push(mensagemRecebida);

          await client.xDel(streamKey, msg.id);

          lastId = msg.id;
        }
      }
    }

    console.log("Mensagens recebidas:", messages);
  }
};

run();
