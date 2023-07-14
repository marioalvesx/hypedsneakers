import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [stock, setStock] = useState(null);
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("@HypedSneakers:cart");

    if (storedCart) {
      return JSON.parse(storedCart);
    }

    return [];
  });

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    // Executa sempre que o cart for atualizado.
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@HypedSneakers:cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  // useEffect(() => {
  //   getStockById(1); // Busca o estoque com ID 1 ao inicializar o componente
  // }, []);

  async function getStockById(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/api/stock/${id}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      setStock(data);
    } catch (error) {
      console.log(error);
    }
    if (!stock) {
      console.log(stock);
    }
  }

  const addProduct = async (productId: number) => {
    console.log(productId);
    getStockById(1);
    try {
      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        (product) => product.id === productId
      );

      console.log("inside try");
      const stock = await api.get(`/stock/${productId}`);
      // const stock = await api.get("/stock");
      console.log(stock);
      const stockAmount = stock.data.amount;
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      if (productExists) {
        productExists.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1,
        };
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch {
      toast.error("Erro na adição do produto");
      console.log("aqui");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
        localStorage.setItem(
          "@HypedSneakers:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      if (amount > stockAmount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(
        (product) => product.id === productId
      );

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem(
          "@HypedSneakers:cart",
          JSON.stringify(updatedCart)
        );
      } else {
        throw Error();
      }
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

  return (
    <>
      <CartContext.Provider
        value={{ cart, addProduct, removeProduct, updateProductAmount }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
