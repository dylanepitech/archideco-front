import React, { useEffect, useState } from 'react'
import { getCategories } from '../../Requests/ProductsRequest'

export default function Produits() {
  const [categories, setCategories] = useState([])
  const [selectedOnglet, setSelectedOnglet] = useState("Categories")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: any = await getCategories();

        if (typeof data === 'string') {
          console.log(data)
        } else {
          setCategories(data);

        }
      } catch (err: any) {
        console.log(err)
      }
    };



    fetchCategories();
  }, []);


  useEffect(() => {
    if (categories) {
      console.log(categories)
    }
  }, [categories])


  return (
    <div>
      <div className="flex justify-center p-4 text-white">
        <div className="bg-red-500 px-4 rounded-tl-md rounded-bl-md " onClick={() => setSelectedOnglet("Categories")}>Categories</div>
        <div className="bg-blue-500 px-4 rounded-tr-md rounded-br-md" onClick={() => setSelectedOnglet("Produits")}>Produits</div>
      </div>
      { selectedOnglet=="Categories"?
      <div>
        <select name="" id="">
          {categories.map((category: any) => (
            <option value={category.id}>{category.title}</option>
          ))}
        </select>
      </div>
      :
      <div>
        search product
      </div>
      }

    </div>
  )
}
