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

interface products {
  title: string;
  description: string;
  image: string;
  oldPrice: string;
  newPrice?: string;
}

const products = [
  {
    title: "Cafetière Expresso ABC123",
    description:
      "Découvrez le plaisir d'un café fraîchement moulu avec cette cafetière expresso compacte et puissante.",
    image: "./src/assets/cafe/cafe1.png",
    oldPrice: "120",
    newPrice: "90",
  },
  {
    title: "Micro-ondes UltraWave 700W",
    description:
      "Micro-ondes performant avec des fonctions de cuisson rapide et une capacité de 20 litres.",
    image: "./src/assets/microonde/microonde1.png",
    oldPrice: "180",
    newPrice: "150",
  },
  {
    title: "Four à convection AirBake 45L",
    description:
      "Four à convection avec 10 modes de cuisson et une capacité de 45 litres pour toutes vos recettes.",
    image: "./src/assets/four/four2.png",
    oldPrice: "320",
    newPrice: "250",
  },
  {
    title: "Mixeur Blender PowerMix 600W",
    description:
      "Mixeur puissant avec 4 lames en acier inoxydable, idéal pour les smoothies et les soupes.",
    image: "./src/assets/mixeur/mixeur1.png",
    oldPrice: "75",
    newPrice: "55",
  },
  {
    title: "Cafetière Filtre ClassicBrew 10Tasses",
    description:
      "Cafetière filtre avec une capacité de 10 tasses et un design élégant en inox.",
    image: "./src/assets/cafe/cafe2.png",
    oldPrice: "80",
    newPrice: "60",
  },
  {
    title: "Micro-ondes Inverter 900W",
    description:
      "Micro-ondes avec technologie Inverter pour une cuisson uniforme et rapide.",
    image: "./src/assets/microonde/microonde2.png",
    oldPrice: "220",
    newPrice: "180",
  },
  {
    title: "Four GrillMaster 60L",
    description:
      "Four avec fonction grill, parfait pour les rôtis et les pizzas, capacité de 60 litres.",
    image: "./src/assets/four/four3.png",
    oldPrice: "350",
    newPrice: "280",
  },
  {
    title: "Mixeur Plongeant EasyBlend 300W",
    description:
      "Mixeur plongeant compact, idéal pour les sauces, les purées et les smoothies.",
    image: "./src/assets/mixeur/mixeur2.png",
    oldPrice: "50",
    newPrice: "35",
  },
];

export default function CardFixHomePage() {
  return products.map((item: products) => (
    <Card maxW="sm" className="overflow-hidden">
      <div className="w-40 h-auto py-1 bg-red-500 absolute top-0 left-0 -rotate-45 -translate-x-8 translate-y-4">
        <p className="text-white text-center pr-2">Promotion</p>
      </div>
      <CardBody>
        <Image
          src={item.image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="2" spacing="3">
          <Heading size="md">{item.title}</Heading>
          <Text className="line-clamp-2">{item.description}</Text>
          <Text fontSize="xl" className="text-green-duck font-semibold">
            <span className="text-red-500 text-md">Promotion : </span>
            {item.newPrice} €
          </Text>
          <Text
            fontSize="xs"
            className="line-through text-green-duck font-semibold"
          >
            {item.oldPrice} €
          </Text>
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
  ));
}
