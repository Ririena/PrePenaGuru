import Fastify from "fastify";
import  userController  from "./controller/userController.js";
import init from './model/init.js'
import fastifyCors from "@fastify/cors"
const fastify = Fastify({
  logger: true,
});


fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

fastify.addHook('onRequest', (req, res, done) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.send();
  } else {
    done();
  }
});
// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.get("/user-datas", async function(req,res){
  return req.user
})

fastify.get("/init", async function handler(request, reply) {
  init();
  return { hello: "world" };
});




userController(fastify);
// Run the server!
try {
  await fastify.listen({ port: 5000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
