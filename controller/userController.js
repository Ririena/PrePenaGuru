import { User } from "../model/user.js";
import fastifyJwt from "@fastify/jwt";
import bcrypt from "bcrypt";
/**
 *
 * @param {import("fastify").FastifyInstance} app
 */

export default function userController(app) {
  app.register(fastifyJwt, {
    secret: "ADLINSECRET123",
    sign: { algorithm: "HS512" },
  });

  // app.get("/user", async (req, res) => {
  //   try {
  //     const data = await User.findAll();
  //     res.send(data);
  //   } catch (error) {
  //     res.status(500).send({ error: "Internal Server Error" });
  //   }
  // });

  app.get("/login", async (req, res) => {
    try {
      const data = await User.findAll();
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: "Error" });
    }
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send({ error: "Invalid credentials" });
        return;
      }

      const token = app.jwt.sign({ userId: user.id });

      res.send({ token, username: user.username, lol: "asdasd", jenis_user: user.jenis_user});
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/data", async (req, res) => {
    try {
      await req.jwtVerify();

      const user = req.user;

      res.send(user);
    } catch (error) {
      res.status(401).send({ error: "Unauthorized" });
    }
  });

  // app.post("/user/profile", async (req, res) => {
  //   try {
  //     await req.jwtVerify();

  //     const { jenis_user, lol } = req.body;

  //     const { userId } = req.user;

  //     const user = await User.findOne({ where: { id: userId } });

  //     if (!user) {
  //       return res
  //         .status(404)
  //         .send({ error: "User Not Found" || "404 Not Found" });
  //     }
  //     await user.update({ jenis_user, lol });
  //     res.send({ message: "Mantap" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  app.post("/user/motto", async (req, res) => {
    try {
      await req.jwtVerify();

      const { lol } = req.body;

      const { userId } = req.user;

      // Temukan pengguna berdasarkan userId
      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Perbarui motto pengguna
      await user.update({ lol });

      res.send({ message: "Motto updated successfully" });
    } catch (error) {
      console.error("Failed:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.post("/user/profile", async (req, res) => {
    try {
      await req.jwtVerify();

      const { jenis_user, username } = req.body;

      const { userId } = req.user;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return res.status(404).send({ error: "User Not Found" });
      }

      const validUserTypes = ["guru", "tata_usaha", "piket"];
      if (!validUserTypes.includes(jenis_user)) {
        return res.status(400).send({ error: "Invalid Tipe User" });
      }
      await user.update({ jenis_user, username });

      res.send({ message: "Profile Update Succesfully" });
    } catch (error) {
      console.error("Failed", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res
          .status(400)
          .send({ error: "Username and password are required" });
      }

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).send({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ username, password: hashedPassword });

      const token = app.jwt.sign({ userId: newUser.id });

      res.status(201).send({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).send({ error: "Registration failed" });
    }
  });

  app.get("/user/:id", async (req, res) => {
    var dataSatu = await User.findOne({ where: { id: req.params.id } });
    return dataSatu;
  });

  app.post("/user", async (req, res) => {
    var dataCreate = await User.create(req.body);
    return dataCreate;
  });

  app.put("/user/:id", async (req, res) => {
    var dataUpdate = await User.update({ where: { id: req.params.id } });
    return dataUpdate;
  });

  app.delete("/user/:id", async (req, res) => {
    var dataDelete = await User.destroy({ where: { id: req.params.id } });
    return dataDelete;
  });
}
