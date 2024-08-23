import { useState, useEffect } from "react";
import { localhost } from "../constants/Localhost";
import { Link, useNavigate } from "react-router-dom";

export default function Card({
  id,
  title,
  price,
  reduction,
  note = 9,
  product,
  onAddToCart,
}: {
  id: number;
  title: string;
  price: string;
  reduction?: string;
  note: number;
  product: any;
  onAddToCart: any;
}) {
  const getImg = (product: any) => {
    let img: any;
    if (product.images) {
      const firstKey: any = Object.keys(product.images)[0];
      const firstValue: any = product.images[firstKey];

      img = removeBaseUrl(firstValue[0].image);
    } else {
      img = product.image ? removeBaseUrl(product.image) : product.image;
    }
    return img;
  };

  const removeBaseUrl = (url: string) => {
    if (localhost == "") {
      const baseUrl = "http://localhost:8000";
      return url.replace(baseUrl, "");
    } else {
      return url;
    }
  };
  const [connected, setConnected] = useState<boolean>(false);
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem("authToken");
    if (token) {
      setConnected(true);
    }
  });

  return (
    <div className="bg-slate-100 rounded-lg border border-zinc-200 max-w-xs w-full h-full flex flex-col">
      <Link to={`/product/${product?.categoryTitle}/${title}/${product?.id}`}>
        <div className="p-2 flex-1 flex items-center justify-center">
          <img
            className="rounded-t-lg object-cover h-48 w-full"
            src={getImg(product)}
            alt={title}
          />
        </div>
        <div className="px-4 flex-1">
          <h5 className="text-lg font-bold text-zinc-900 truncate">{title}</h5>
          <p className="text-sm text-zinc-700 truncate">
            {product?.categoryTitle}
          </p>
          <div className="flex items-center mt-2">
            <span className="bg-green-500 text-white text-xs font-bold uppercase px-2 py-1 rounded">
              A
            </span>
            <span className="ml-2 text-xs text-zinc-500">{note} / 10</span>
          </div>
          {reduction ? (
            <div className="mt-2 flex flex-row items-center gap-1 justify-center">
              <span className="text-red-600 font-bold text-xl">{price}</span>
              <span className="line-through text-zinc-500 text-sm">
                {reduction}
              </span>
              <DiscountCalculator price={price} reduction={reduction} />
            </div>
          ) : (
            <div className="mt-2">
              <span className="text-slate-700 font-medium  text-lg">
                {price}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <button
          className="w-full bg-red-500 text-white font-bold py-2 text-sm rounded hover:bg-red-600"
          onClick={connected ? onAddToCart : onLogin}
        >
          🛒 Ajouter au panier
        </button>
      </div>
    </div>
  );
}

interface Props {
  price: string; // Prix original sous forme de chaîne
  reduction: string; // Prix réduit sous forme de chaîne
}

const DiscountCalculator: React.FC<Props> = ({ price, reduction }) => {
  const [pourcentage, setPourcentage] = useState<number>(0);

  useEffect(() => {
    const calculateDiscount = () => {
      try {
        const priceInt = parseFloat(price.replace("€", "").replace(",", "."));
        const reductionInt = parseFloat(
          reduction.replace("€", "").replace(",", ".")
        );

        if (priceInt <= 0 || reductionInt < 0) {
          throw new Error("Les valeurs de prix doivent être positives.");
        }

        const discountPercentage = ((priceInt - reductionInt) / priceInt) * 100;

        setPourcentage(Math.round(discountPercentage));
      } catch (error) {
        console.error(
          "Erreur lors du calcul du pourcentage de réduction:",
          error
        );
        setPourcentage(0);
      }
    };

    calculateDiscount();
  }, [price, reduction]);

  return (
    <span className="bg-red-500 text-white text-xs font-bold uppercase px-2 rounded mt-2 inline-block">
      BON PLAN {pourcentage.toFixed()}%
    </span>
  );
};
