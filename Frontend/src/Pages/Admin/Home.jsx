   
   import { useEffect,useState } from "react";
   import axios from "axios";

   const Home = ()=>{
    const [products,setProducts] = useState([]);
    const [form,setForm] = useState({
        name:"",
        description:"",
        price:""
    });

    useEffect(()=>{
        getProducts();
    },[]);  
   

   //for create product//

   const addProduct = async(e)=>{
    e.preventDefault();
    await axios.post(
        "http://localhost:3000/product",
        form
    );
    setForm({
        name:"",
        description:"",
        price:""
    })
    getProducts();

   }

   //for read product//

   const getProducts = async()=>{
    try {
       const res = await axios.get(
         "http://localhost:3000/product"
       );
       setProducts(res.data);
    } catch (error) {
        console.log(error);
    }
   }

   return(
    <div>
        <h1>Admin Dashboard</h1>
        <form onSubmit={addProduct}>
            <input placeholder="name" value={form.name} onChange={(e)=>setForm({
                ...form,
                name:e.target.value
            })}
            />

            <input placeholder="description" value = {form.description} onChange={(e)=>setForm({
                ...form,
                description:e.target.value
            })}
            />

             <input placeholder="price" value={form.value} onChange={(e)=>setForm({
                ...form,
                price:e.target.value
             })}
            />
           <button>Add product</button>
        </form>
           <hr />
            
            {
           product.map((product)=>(
            <div key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>

                <button onClick={()=>updateProduct(product._id)}>Edit</button>
                 <button onClick={()=>deleteProduct(product._id)}>Delete</button>
            </div>
           ))
           
        }


    </div>
   )
}



   export default Home;