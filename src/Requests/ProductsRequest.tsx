import axios from "axios";
import { Category, Product } from "../Types/category";
import { localhost } from "../constants/Localhost";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(`${localhost}/api/get-category`);
  return response.data;
};

export const getProductByCategoryId = async (
  categoryId: number
): Promise<Product[]> => {
  const response = await axios.get<Product[]>(
    `${localhost}/api/get-product/${categoryId}`
  );
  return response.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${localhost}/api/get-products`);
  return response.data;
};

export const getTopFive = async (): Promise<Product[] | string> => {
  const response = await axios.get<Product[]>(`${localhost}/api/get-topfive`);
  return response.data;
};

export const getGem = async (): Promise<Product[] | string> => {
  const response = await axios.get<Product[]>(
    `${localhost}/api/get-gem-products`
  );
  return response.data;
};
export const getPem = async (): Promise<Product[] | string> => {
  const response = await axios.get<Product[]>(
    `${localhost}/api/get-pem-products`
  );
  return response.data;
};
export const getCuisine = async (): Promise<Product[] | string> => {
  const response = await axios.get<Product[]>(
    `${localhost}/api/get-cuisine-products`
  );
  return response.data;
};

export const getPromotion = async (): Promise<Product[] | string> => {
  try {
    const response = await axios.get<Product[]>(
      `${localhost}/api/get-products/promotion`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch promotions:", error);
    return "An error occurred while fetching promotions.";
  }
};


export const getSousCategory = async (token: string): Promise<any | string> => {
    try {
      const response = await axios.get(`${localhost}/api/sous-category`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data.message || 'Une erreur est survenue';
      } else {
        return 'Une erreur est survenue';
      }
    }
  };
