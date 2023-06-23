import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";

import Router from "./routes";
import GlobalStyles from "./styles/global";
import Header from "./components/Header";

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Router />
      </CartProvider>
    </BrowserRouter>
  );
}
