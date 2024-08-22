import React, { useState, useEffect, useContext } from "react";
import { localhost } from "../constants/Localhost";
import { AuthContext } from "../hooks/AuthContext";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Card({
  id,
  title,
  price,
  reduction = 0,
  note = 9,
  product,
  onAddToCart,
}: {
  id: number;
  title: string;
  price: string;
  reduction: number;
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
    if (localhost === "") {
      const baseUrl = "http://localhost:8000";
      return url.replace(baseUrl, "");
    } else {
      return url;
    }
  };
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
          <div className="mt-2">
            <span className="text-red-600 font-bold text-xl">{price}</span>
            <span className="line-through text-zinc-500 text-sm">599,99 €</span>
            <span className="bg-red-500 text-white text-xs font-bold uppercase px-2 rounded mt-2 inline-block">
              BON PLAN -25%
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <button
          className="w-full bg-red-500 text-white font-bold py-2 text-sm rounded hover:bg-red-600"
          onClick={onAddToCart}
        >
          🛒 Ajouter au panier
        </button>
      </div>
    </div>
  );
}
