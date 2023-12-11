//Author: Elias Newlin
//ISU Netid : newlin18@iastate.edu
//Date :  December 04, 2023


import { useState, useEffect } from "react";


function App() {
    const [product, setProduct] = useState([]);
    const [oneProduct, setOneProduct] = useState([]);
    // new Product
    const [addNewProduct, setAddNewProduct] = useState({
    id: null,
    title: "",
    price: null,
    description: "",
    category: "",
    image: "",
    rating: {rate: null,
            count:null}
    });

    const [editProductTitle, setEditProductTitle] = useState({
        id: 0,
        title: ""
        });

    const [reload, setReload] = useState(false);
    const [viewer1, setViewer1] = useState(false);
    const [viewer4, setViewer4] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [index, setIndex] = useState(0);


    const showAllItems = product.map((el) => (
        
        <div key={el.id}>
        <img src={el.image} width={30} alt="images" /> <br />
        Title: {el.title} <br />
        Category: {el.category} <br />
        Price: {el.price} <br />
        Rating :{el.rating.rate} <br />
        </div>
        ));


    function editOneProduct() 
    {
            console.log(editProductTitle)
            fetch("http://192.168.4.227:8080/api/item", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"id":Number(editProductTitle.id), "title":editProductTitle.title}),
            })
            // const dataArr = [];
            // dataArr.push(data);
    }


    function handleChange(evt) 
    {
            const value = evt.target.value;
            if (evt.target.name === "id") 
            {
                setAddNewProduct({ ...addNewProduct, id: Number(value) });
            } 
            else if (evt.target.name === "title") 
            {
                setAddNewProduct({ ...addNewProduct, title: value });
            } 
            else if (evt.target.name === "price") 
            {
                setAddNewProduct({ ...addNewProduct, price: value });
            } 
            else if (evt.target.name === "description") 
            {
            setAddNewProduct({ ...addNewProduct, description: value });
            } 
            else if (evt.target.name === "category") 
            {
            setAddNewProduct({ ...addNewProduct, category: value });
            } 
            else if (evt.target.name === "image") 
            {
            setAddNewProduct({ ...addNewProduct, image: value });
	        }
	        else if (evt.target.name === "rating") 
	        {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value,
                                                            count: 0}, });
            }
            else if (evt.target.name === "tId")
            {
                setEditProductTitle({ ...editProductTitle, id: value });
            }
            else if (evt.target.name === "tTitle")
            {
                setEditProductTitle({ ...editProductTitle, title: value });
            }
    }

	function handleOnSubmit(e)
	{
	    e.preventDefault();
	    console.log(e.target.value);
	    fetch("http://192.168.4.227:8080/api/item", {
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    body: JSON.stringify(addNewProduct),
	    })
	    };

    function getOneByOneProductNext() {
	if (product.length > 0) {
	if (index === product.length - 1) setIndex(0);
	else setIndex(index + 1);
	if (product.length > 0) setViewer4(true);
	else setViewer4(false);
	}
	}
    function getOneByOneProductPrev() {
	if (product.length > 0) {
	if (index === 0) setIndex(product.length - 1);
	else setIndex(index - 1);
	if (product.length > 0) setViewer4(true);
	else setViewer4(false);
	}
	}
	function deleteOneProduct(deleteid) {
	    console.log("Product to delete :", deleteid);
	    fetch("http://192.168.4.227:8080/api/item/", {
	    method: "DELETE",
	    headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"id":deleteid})
	    });
	    //setChecked4(!checked4);
	    getAllProducts();
	    }




    useEffect(() => {
        getAllProducts();
        }, [reload]);

        function getAllProducts() {
        fetch("http://192.168.4.227:8080/api/item")
        .then((response) => response.json())
        .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
        });
        setViewer1(!viewer1);
        }


return (

<div>


	<h1>Catalog of Products</h1>
	<div>
	<h3>Show all available Products.</h3>
	<button onClick={() => {getAllProducts()}}>Show All ...</button>
	{viewer1 && <div>Products {showAllItems}</div>}
	</div>
<div>

<div>
	<h3>Change a product title by Id:</h3>
	<input
	type="text"
	id="message"
	name="tId"
	placeholder="id"
	onChange={handleChange}
	/>
    <input
	type="text"
	id="message"
	name="tTitle"
	placeholder="new title"
	onChange={handleChange}
	/>
    <button type="submit" onClick={() => editOneProduct()}>Presto</button>
	
</div>



<div>
	<h3>Add a new product :</h3>
	<form action="">
	<input type="number" placeholder="id?" name="id" value={addNewProduct.id}
	onChange={handleChange} />
	<input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
	<input type="number" placeholder="price?" name="price" value={addNewProduct.price}
onChange={handleChange} />
	<input type="text" placeholder="description?" name="description" value={addNewProduct.description}
onChange={handleChange} />
	<input type="text" placeholder="category?" name="category" value={addNewProduct.category}
onChange={handleChange} />
	<input type="text" placeholder="image?" name="image" value={addNewProduct.image}
onChange={handleChange} />
	<input type="number" placeholder="rate?" name="rating" value={addNewProduct.rating.rate}
onChange={handleChange} />
	<button type="submit" onClick={handleOnSubmit}>
submit
	</button>
	</form>
</div>
</div>

<div>
	<div>
	<h3>Delete one product:</h3>
	<input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
onChange={(e) => {setChecked4(!checked4)}} />
	<button onClick={() => getOneByOneProductPrev()}>Prev</button>
	<button onClick={() => getOneByOneProductNext()}>Next</button>
	<button onClick={() => {deleteOneProduct(product[index].id);setIndex(0)}}>
Delete
	</button>
{checked4 && (
	<div key={product[index].id}>
	<img src={product[index].image} width={30} /> <br />
Id:{product[index].id} <br />
Title: {product[index].title} <br />
Category: {product[index].category} <br />
Price: {product[index].price} <br />
Rating :{product[index].rating.rate} <br />
	</div>
)}
	</div>
</div>


</div>

); // return end
} // App end








export default App;
