import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { User } from "./type";

let DB: User = {
  name: "",
  email: "",
  mobile_no: "",
};

const app = new Hono();

app.get("/", (c) => c.text("Hono meets Node.js"));

app.post("/user", async (c: Context) => {
  try {
    const body = await c.req.json();

    if (typeof body === "object") {
      if ("email" in body) {
        DB.email = body.email as string;
      }
      if ("name" in body) {
        DB.name = body.name as string;
      }
      if ("mobile_no" in body) {
        DB.mobile_no = body.mobile_no as string;
      }
    }

    return c.json(DB); // Simplified response handling
  } catch (error) {
    console.error("Error in processing request", error);
    return c.json({ error: "Error in processing request" });
  }
});
app.get("/user", (c) => c.json(DB));

app.put("/user", async (c: Context) => {
  try {
    const body = await c.req.json();

    if (typeof body === "object") {
      if ("email" in body) {
        DB.email = body.email as string;
      }
      if ("name" in body) {
        DB.name = body.name as string;
      }
      if ("mobile_no" in body) {
        DB.mobile_no = body.mobile_no as string;
      }
    }

    return c.json(DB);
  } catch (error) {
    console.error("Error in processing request", error);
    return c.json({ error: "Error in processing request" });
  }
});

app.delete("/user", (c: Context) => {
  DB = {
    name: "",
    email: "",
    mobile_no: "",
  };

  return c.json(DB);
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
