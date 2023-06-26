import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/stock", () => {
      return [
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
      ];
    });

    this.get("/products", () => {
      return [
        {
          id: 1,
          title: "Tênis de Caminhada Leve Confortável",
          price: 179.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg",
        },
        {
          id: 2,
          title: "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
          price: 139.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg",
        },
        {
          id: 3,
          title: "Tênis Adidas Duramo Lite 2.0",
          price: 219.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg",
        },
        {
          id: 5,
          title: "Tênis VR Caminhada Confortável Detalhes Couro Masculino",
          price: 139.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg",
        },
        {
          id: 6,
          title: "Tênis Adidas Duramo Lite 2.0",
          price: 219.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg",
        },
        {
          id: 4,
          title: "Tênis de Caminhada Leve Confortável",
          price: 179.9,
          image:
            "https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg",
        },
      ];
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
