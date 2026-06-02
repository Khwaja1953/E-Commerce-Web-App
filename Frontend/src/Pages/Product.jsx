
import { useEffect,useState } from "react";
import { Get } from "../services/api";

function Product(){
  const [products, setProducts]= useState([]);

  const fetchProducts = async()=>{
    try {
        const data = await Get("/product/get-all-products");
        console.log(res.data);
        setProducts(data);
    } catch (error) {
        console.log(error);
        
    }
  };
  useEffect(()=>{
    fetchProducts();
  },[]);

  return(
    <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
            All products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {products.map((product) => (
                <div
            key={product._id}
            className="border rounded-lg p-4 shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
             <h2 className="text-xl font-semibold mt-2">
              {product.name}
            </h2>

            <p className="text-gray-600">
              {product.description}
            </p>
            <p className="font-bold mt-2">
              ₹ {product.price}
            </p>
             <button className="bg-black text-white px-4 py-2 mt-3 w-full rounded">
              Add to Cart
            </button>
          </div>
        ))}
        
        </div>
    </div>
  );
}
export default Product;