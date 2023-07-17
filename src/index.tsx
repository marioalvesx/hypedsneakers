import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Model, createServer } from "miragejs";

createServer({
  models: {
    product: Model,
    stock: Model,
  },

  seeds(server) {
    server.db.loadData({
      stocks: [
        {
          id: 1,
          amount: 3,
        },
        {
          id: 2,
          amount: 5,
        },
        {
          id: 3,
          amount: 2,
        },
        {
          id: 4,
          amount: 1,
        },
        {
          id: 5,
          amount: 5,
        },
        {
          id: 6,
          amount: 10,
        },
      ],
      products: [
        {
          id: 1,
          title: "Yeezy 700 V1 Salt",
          price: 179.9,
          image: "https://i.ibb.co/Z1ZvFGL/26202317103280.webp",
        },
        {
          id: 2,
          title: "Yeezy Boost 700 v1 Hi-Res Blue",
          price: 139.9,
          image: "https://i.ibb.co/D4sk3pw/2682022195637822.webp",
        },
        {
          id: 3,
          title: "Yeezy 450 Stone Flax",
          price: 219.9,
          image: "https://i.ibb.co/Q9WML84/20102022203611178.webp",
        },
        {
          id: 5,
          title: "Yeezy 500 Utility Black",
          price: 139.9,
          image: "https://i.ibb.co/bj0MyfY/262023171334899.webp",
        },
        {
          id: 6,
          title: "Yeezy Boost 350 V2 Onyx",
          price: 219.9,
          image: "https://i.ibb.co/GMWKJtw/2712023175528369.webp",
        },
        {
          id: 4,
          title: "Yeezy 350 V2 Salt",
          price: 179.9,
          image: "https://i.ibb.co/KyKtndd/20102022203439316.webp",
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/products", () => {
      return this.schema.all("product");
    });

    this.get("/products/:id", (schema, request) => {
      const id = request.params.id;
      return schema.find("product", id);
    });

    this.get("/stocks", () => {
      return this.schema.all("stock");
    });

    this.get("/stocks/:id", (schema, request) => {
      const id = request.params.id;
      return schema.find("stock", id);
    });

    this.post("/products", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("product", data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
