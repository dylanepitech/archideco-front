import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Stack,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { getPromotion } from "../Requests/ProductsRequest";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  weight: string;
  images: {
    [key: string]: Array<{
      hexa: string;
      color: string;
      image: string;
    }>;
  };
  sizes: {
    hauteur: number;
    largeur: number;
    profondeur: number;
  };
  reduction: string;
  newPrice?: number;
  oldPrice?: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getPromotion();
      if (typeof data === "string") {
        console.error(data);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map((item: Product) => {
        // Adjust the key ('main' or other) based on your actual data
        const imageKey = Object.keys(item.images)[0];
        const imageUrl = item.images[imageKey]?.[0]?.image;

        return (
          <Card key={item.id} maxW="sm" className="overflow-hidden">
            <div className="w-40 h-auto py-1 bg-red-500 absolute top-0 left-0 -rotate-45 -translate-x-8 translate-y-4">
              <p className="text-white text-center pr-2">Promotion</p>
            </div>
            <CardBody>
              {imageUrl ? (
                <Image src={imageUrl} alt={item.title} borderRadius="lg" />
              ) : (
                <p>No image available</p>
              )}
              <Stack mt="2" spacing="3">
                <Heading size="md">{item.title}</Heading>
                <Text className="line-clamp-2">{item.description}</Text>
                {item.reduction && (
                  <Text fontSize="xl" className="text-green-duck font-semibold">
                    <span className="text-red-500 text-md">Promotion : </span>
                    {item.reduction} €
                  </Text>
                )}
                {item.price && (
                  <Text
                    fontSize="lg"
                    className="line-through text-green-duck font-semibold"
                  >
                    {item.price}
                  </Text>
                )}
                <DiscountCalculator
                  price={item.price}
                  reduction={item.reduction}
                />
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Voir le produit
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default ProductList;
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
    <span className="bg-red-500 text-white text-md font-bold uppercase px-2 rounded mt-2 inline-block col-span-12">
      BON PLAN -{pourcentage.toFixed()}%
    </span>
  );
};
