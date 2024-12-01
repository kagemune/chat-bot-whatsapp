const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");
require("dotenv").config;

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { delay } = require("@whiskeysockets/baileys");
const path = require("path");
const fs = require("fs");

// const { handlerAI } = require("./whisper");

// const flowVoice = addKeyword(EVENTS.VOICE_NOTE).addAction(
//   async (ctx, ctxFn) => {
//     const text = await handlerAI(ctx);
//     console.log(text);
//   }
// );

// const chatGPT = require("./chatgpt");
// const chat = require("./gemini");

// const chatGPTPrompt_path = path.join(__dirname, "mensajes", "peticion.txt");
// const chatGPTPrompt = fs.readFileSync(chatGPTPrompt_path, "utf-8");
const inicioPath = path.join(__dirname, "mensajes", "inicio.txt");
const inicio = fs.readFileSync(inicioPath, "utf-8");

const reclamoPath = path.join(__dirname, "mensajes", "reclamos.txt");
const reclamo = fs.readFileSync(reclamoPath, "utf-8");

const solicitudPath = path.join(__dirname, "mensajes", "solicitud.txt");
const solicitud = fs.readFileSync(solicitudPath, "utf-8");

const flowPrincipal = addKeyword(["hola", "alo", "buen dia"]).addAnswer(
  "hola encantado de ayudarte, para desplegar el menu de opciones escribe    inicio ",
  { capture: true },
  async (ctx, ctxFn) => {
    if (ctx.body.includes("Inicio")) {
      ctxFn.gotoFlow(flowInicio);
    } else {
      await ctxFn.flowDynamic("no entendi, intentelo de nuevo ");
      return ctxFn.fallBack;
    }
  }
);

const flowWelcome = addKeyword(EVENTS.WELCOME).addAnswer(
  "Hola, bienvenido al chat de PQRS de movistar arena,para desplegar el menu de opciones escribe    inicio ",
  { capture: true },
  async (ctx, ctxFn) => {
    if (ctx.body.includes("Inicio")) {
      ctxFn.gotoFlow(flowInicio);
    } else {
      await ctxFn.flowDynamic("no entendi, intentelo de nuevo ");
      return ctxFn.fallBack;
    }
  }
);

const flowInicio = addKeyword(EVENTS.ACTION).addAnswer(
  inicio,
  { capture: true },
  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
    if (!["1", "2", "0"].includes(ctx.body)) {
      return fallBack(
        "Respuesta no válida, por favor selecciona una de las opciones."
      );
    }
    switch (ctx.body) {
      case "1":
        return gotoFlow(flowBotSol);
      case "2":
        return await flowDynamic(
          "permanezca en linea un  de nuestros asesores lo atendera pronto"
        );
      case "0":
        return await flowDynamic(
          "Saliendo... Puedes volver a acceder a este menú escribiendo '*Inicio*'"
        );
    }
  }
);
const flowBotSol = addKeyword(EVENTS.ACTION).addAnswer(
  solicitud,
  {
    capture: true,
  },
  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
    if (!["1", "2", "3", "4", "0"].includes(ctx.body)) {
      return fallBack(
        "Respuesta no válida, por favor selecciona una de las opciones."
      );
    }
    switch (ctx.body) {
      case "1":
        return gotoFlow(peticionFlow);
      case "2":
        return gotoFlow(flowReclamo);
      case "3":
        return gotoFlow(flowQueja);
      case "4":
        return gotoFlow(flowSugerencia);
      case "0":
        return await flowDynamic(
          "Saliendo... Puedes volver a acceder a este menú escribiendo '*Inicio*'"
        );
    }
  }
);

const peticionFlow = addKeyword(EVENTS.ACTION).addAnswer(
  "que petiticion deseas hacer "

  // { capture: true },
  // async (ctx, ctxFn) => {
  //   const prompt = "di hola";
  //   const question = ctx.body;
  //   const answer = await chat(prompt, question);
  //   console.log(ctx.body);
  //   console.log(answer.content);
  // await ctxFn.flowDynamic(answer.content);
  // }
);

const flowReclamo = addKeyword(EVENTS.ACTION).addAnswer(
  reclamo,
  { capture: true },
  async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
    if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
      return fallBack(
        "Respuesta no válida, por favor selecciona una de las opciones."
      );
    }
    switch (ctx.body) {
      case "1":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "2":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "3":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "4":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "5":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "0":
        return await flowDynamic(
          "Saliendo... Puedes volver a acceder a este menú escribiendo '*Inicio*' "
        );
    }
  }
);
const flowQueja = addKeyword(EVENTS.ACTION).addAnswer(
  reclamo,
  { capture: true },
  async (ctx, { fallBack, flowDynamic }) => {
    if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
      return fallBack(
        "Respuesta no válida, por favor selecciona una de las opciones."
      );
    }
    switch (ctx.body) {
      case "1":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "2":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "3":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "4":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "5":
        return await flowDynamic(
          "su inquietud sera resulta en los proximos 3 dias habiles "
        );
      case "0":
        return await flowDynamic(
          "Saliendo... Puedes volver a acceder a este menú escribiendo '*Inicio*' "
        );
    }
  }
);
const flowSugerencia = addKeyword(EVENTS.ACTION).addAnswer(
  "ingresa tu sugerencia",
  { capture: true },
  async (ctx, { flowDynamic }) => {
    console.log(ctx.body);
    return await flowDynamic("tendremos en cuenta tu sugerencia ");
  }
);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowWelcome,
    flowPrincipal,
    flowInicio,
    flowBotSol,
    peticionFlow,
    flowQueja,
    flowReclamo,
    flowSugerencia,
    // flowVoice,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
