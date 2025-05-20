import { createClient } from "redis";
import dotenv from "dotenv";
import { v4 } from "uuid";
const { config } = dotenv;
config();

const run = async () => {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      tls:
        process.env.NODE_ENV === "production"
          ? {
              rejectUnauthorized: true,
            }
          : {
              rejectUnauthorized: false,
            },
    },
    // password: process.env.REDIS_PASSWORD,
  });

  client.on("error", (err) => console.error("Erro no Redis:", err));

  await client.connect();

  const streamKey = "meu_topico";

  const id = await client.xAdd(streamKey, "*", {
    tipo: "notificacao",
    mensagem: "Olá, essa é uma mensagem publicada!" + v4(),
  });

  console.log("Mensagem publicada com ID:", id);

  await client.quit();
};

run();
