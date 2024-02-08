import fastify from "fastify";
import { Admin } from "../model/admin";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */

app.get("/admin", async (req, res) => {
  getData = await Admin.findAll();

  return getData;
});

app.put("/admin", async (req, res) => {
  updateAdmin = await Admin.update();

  return updateAdmin;
});

app.post("/admin", async (req, res) => {
  createAdmin = await Admin.create();

  return createAdmin();
});

app.delete("/admin/:id", async (req, res) => {
  deleteAdmin = await Admin.destroy();

  return deleteAdmin();
});

app.post("/admin/register", async (req, res) => {
  try {
    await req.jwtVerify();

    const admin = req.user;
  } catch (error) {
    console.error(error.message);
  }
});
