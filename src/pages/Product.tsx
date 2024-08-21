import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Accordion from '../components/Accordion';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { AuthContext } from "../hooks/AuthContext";
import { useToast } from '@chakra-ui/react'
import { getMyCart, createCart, updateCart } from "../Requests/CartRequest";
import { getCategories, getProductByCategoryId } from '../Requests/ProductsRequest';
import { localhost } from "../constants/Localhost";
import { CreateCartBody } from '../Types/cartCrud';

export default function Product() {

    const { category, productTitle, id } = useParams();
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { authToken } = useContext(AuthContext);
    const toast = useToast()
    const navigate = useNavigate();
    const [product, setProduct] = useState<any | null>(null);
    const [mainImage, setMainImage] = useState('');
    const [cart, setCart] = useState<any | null>(null);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                // setCategories(categoriesData);

                const titleSearched = category?.toLowerCase();
                const data = categoriesData
                    .filter(c => c.title.toLowerCase() === titleSearched)
                    .map(c => c.id);

                if (data.length > 0) {
                    setCategoryId(data[0]);
                } else {
                    setCategoryId(null);
                }
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchCategories();
    }, [category]);

    useEffect(() => {
        if (product) {
            // console.log(product);
            setMainImage(removeBaseUrl(product?.images[Object.keys(product?.images)[0]][0].image))
            // console.log(removeBaseUrl(product?.images[Object.keys(product?.images)[0]][0].image))

        }
    }, [product]);

    useEffect(() => {
        if (categoryId !== null) {
            handleGetProduct(categoryId);
        }
    }, [categoryId]);


    useEffect(() => {
        handleGetMyCart()
    }, [cart]);


    const handleGetProduct = async (categoryId: number) => {
        try {
            const data: any[] = await getProductByCategoryId(categoryId);
            const productId = id;
            const expectedTitle: any = productTitle;

            const specificProduct = data.find(
                (product: any) => product.id == productId && product.title.toLowerCase() == expectedTitle.toLowerCase()
            );





            if (specificProduct) {
                setProduct(specificProduct);
            } else {
                navigate('/sorry/not-found');

            }
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        }
    };



    const handleCreateCart = async (idProduct: number) => {
        try {
            if (authToken) {
                const cartData: CreateCartBody = {
                    idProducts: [idProduct]
                };
                const data: any | string = await createCart(authToken, cartData);
                if (typeof data === 'string') {
                    setError(data);

                    toast({
                        title: data,
                        description: '',
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                        isClosable: true,
                    });
                } else {
                    setCart(data);
                    toast({
                        title: "Felicitation",
                        position: 'top',
                        description: `${product?.title} ajouté au panier`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                }

            }
        } catch (err) {
            setError("Erreur lors de la création du panier");
            console.error("Erreur:", err);
        }
    };

    const handleUpdateCart = async (idProduct: number) => {
        try {
            if (authToken) {
                let newProducts = cart?.id_products
                newProducts.push(idProduct)
                const updateData: CreateCartBody = {
                    idProducts: newProducts
                };
                let id = cart?.id
                const data: any | string = await updateCart(authToken, id, updateData);
                if (typeof data === 'string') {
                    setError(data);
                    console.log("error", data)
                    toast({
                        title: data,
                        description: '',
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                        isClosable: true,
                    });
                } else {
                    setCart(data);
                    toast({
                        title: "Felicitation",
                        position: 'top',
                        description: `${product?.title} ajouté au panier`,
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                    console.log(cart)
                }
            }
        } catch (err) {
            setError("Erreur lors de la mise à jour du panier");
            console.error("Erreur:", err);
        }
    };

    const handleGetMyCart = async () => {
        try {
            if (authToken) {

                const data: any | string = await getMyCart(authToken);
                if (typeof data === 'string') {
                    setCart(null);
                    setError(data);
                } else {

                    setCart(data.data)
                    // console.log(data.data)
                }
            }
        } catch (err) {
            setError("Erreur lors de la mise à jour du panier");
            console.error("Erreur:", err);
        }
    };


    const changeImage = (src: string) => {
        setMainImage(src);
    };

    function removeBaseUrl(url: any) {
        if (localhost == "") {

            if (typeof url == "string") {
                const baseUrl = "http://localhost:8000";
                return url.replace(baseUrl, '');
            }
        } else {
            return url;
        }

    }

    return (
        <div className="bg-white w-screen min-h-screen text-black">
            <Navbar />
            <main className="flex  mt-6 px-4 gap-6">
                <div className='flex flex-col items-center md:items-start md:flex-row gap-4 w-full justify-center gap-6'>
                    <div className="flex flex-col-reverse md:flex-row gap-2 items-start ">
                        <div className="flex flex-row flex-wrap md:flex-col items-center gap-2 md:gap-0  w-full md:w-1/4 space-y-4 md:space-y-2">
                          
                            {product?.images &&
                                Object.values(product.images).flat().slice(0, 12).map((imageObj: any, index) => (
                                    <div key={index} className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] flex items-center justify-center flex-shrink-0">
                                        <img
                                            key={index}
                                            src={removeBaseUrl(imageObj.image)}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="cursor-pointer rounded-lg w-full h-full object-cover  border border-gray-300 hover:border-blue-500"
                                            onClick={() => changeImage(removeBaseUrl(imageObj.image))}

                                        />
                                    </div>
                                ))}
                        </div>

                        <div className="flex-1 w-full h-full md:w-2/4 mb-4 md:mb-0">
                            <img
                                src={mainImage ? mainImage : removeBaseUrl(product?.images[Object.keys(product?.images)[0]][0].image)}
                                alt="Main product image"
                                className="rounded-lg w-full rounded-xl w-[300px] md:w-[500px] h-full"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center flex-col space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{product?.title}</h2>
                        <p className="text-lg text-gray-700 mb-2">{product?.description}</p>
                        <p className="text-lg text-green-500 mb-4">{product?.price}</p>
                        <div className="flex flex-wrap items-center space-x-2 mb-4">
                            <span className="bg-green-500 text-white px-2 py-1 rounded">G</span>
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded">A</span>
                            <span className="bg-red-500 text-white px-2 py-1 rounded">T</span>
                        </div>

                        <p className="text-gray-600 mb-2">Comment obtenir:</p>
                        <p className="text-gray-600 mb-2">Livraison: Vérifier la disponibilité pour une livraison</p>
                        <p className="text-gray-600 mb-4">En magasin: Vérifier le stock en magasin</p>
                        <Accordion title="Carateristiques" >
                            <ul className="list-disc pl-5">
                                <li><span className="font-bold">Poids</span>: {product?.weight}</li>
                                {product && product.sizes ? (
                                    Object.entries(product.sizes).map(([key, value], index) => (
                                        <li key={index}><span className="font-bold">{key}</span>: {value as any}</li>
                                    ))
                                ) : (
                                    <p></p>
                                )}
                            </ul>

                        </Accordion>
                        <div className="flex items-center space-x-2">
                            <button
                                className="bg-green-emerald text-white hover:bg-green-duck rounded px-4 py-2"
                                onClick={() => cart ? handleUpdateCart(product?.id) : handleCreateCart(product?.id)}
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
