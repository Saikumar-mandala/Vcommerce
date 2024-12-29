import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    color: "",
    size: "",
    quantity: "",
    category: "",
    subCategory: "",
    superSubCategory: "",
  });
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [superSubCategories, setSuperSubCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle image change
  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // Fetch Brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/brands/allBrands"
        );
        if (!response.ok) throw new Error("Failed to fetch brands");
        setBrands(await response.json());
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/categories/allCategories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        setCategories(await response.json());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Colors
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/color/allColors"
        );
        if (!response.ok) throw new Error("Failed to fetch colors");
        setColors(await response.json());
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();
  }, []);

  // Fetch Sizes
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/sizes/allSizes"
        );
        if (!response.ok) throw new Error("Failed to fetch sizes");
        const data = await response.json();
        setSizes(data.success ? data.size : []);
      } catch (error) {
        console.error("Error fetching sizes:", error);
        setSizes([]);
      }
    };
    fetchSizes();
  }, []);

  // Fetch Subcategories based on selected category
  useEffect(() => {
    if (product.category) {
      const fetchSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/subcategories/category/${product.category}`
          );
          if (!response.ok) throw new Error("Failed to fetch subcategories");
          setSubCategories(await response.json());
        } catch (error) {
          console.error("Error fetching subcategories:", error);
          setSubCategories([]);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [product.category]);

  // Fetch SuperSubCategories based on selected subcategory
  useEffect(() => {
    if (product.subCategory) {
      const fetchSuperSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/supersubcategories/subcategory/${product.subCategory}`
          );
          if (!response.ok) throw new Error("Super SubCategories not found");
          setSuperSubCategories(await response.json());
        } catch (error) {
          console.error("Error fetching super subcategories:", error);
          setSuperSubCategories([]); // Set an empty list or show a message
        }
      };
      fetchSuperSubCategories();
    } else {
      setSuperSubCategories([]);
    }
  }, [product.subCategory]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    // Prepare the product data
    const selectedCategory = categories.find(
      (cat) => cat._id === product.category
    );
    const selectedSubCategory = subCategories.find(
      (sub) => sub._id === product.subCategory
    );
    const selectedSuperSubCategory = superSubCategories.find(
      (superSub) => superSub._id === product.superSubCategory
    );
  
    const productData = {
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      color: product.colorname,
      size: product.size,
      quantity: product.quantity,
      category: selectedCategory?.categoryName || "",
      subcategory: selectedSubCategory?.title || "",
      supersubcategory: selectedSuperSubCategory?.title || "",
    };
  
    // Log the productData to the console before making the API call
    console.log("Submitting product data:", productData);
  
    try {
      const response = await fetch("http://localhost:4000/api/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
        body: JSON.stringify(productData), // Send JSON body
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      navigate("/products/product-list");
    } catch (error) {
      setError(`Error creating product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Add Product
          </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            {/* Product Title */}
            <div>
              <input
                type="text"
                name="title"
                value={product.title}
                placeholder="Product Title"
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Product Description */}
            <div>
              <textarea
                name="description"
                value={product.description}
                placeholder="Description"
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Price */}
            <div>
              <input
                type="number"
                name="price"
                value={product.price}
                placeholder="Price"
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Quantity */}
            <div>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                placeholder="Quantity"
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Brand Select */}
            <div>
              <select
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select Brand
                </option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.brandname}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Select */}
            <div>
              <select
                name="color"
                value={product.color}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select color
                </option>
                {colors.map((color) => (
                  <option key={color._id} value={color._id}>
                    {color.colorname}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Select */}
            <div>
              <select
                name="size"
                value={product.size}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select size
                </option>
                {sizes.map((size) => (
                  <option key={size._id} value={size._id}>
                    {size.size}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Select */}
            <div>
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* SubCategory Select */}
            <div>
              <select
                name="subCategory"
                value={product.subCategory}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>
                  Select SubCategory
                </option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.title}
                  </option>
                ))}
              </select>
            </div>

            {/* SuperSubCategory Select */}
            <div>
              <select
                name="superSubCategory"
                value={product.superSubCategory}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Super SubCategory</option>
                {superSubCategories.map((superSubCategory) => (
                  <option
                    key={superSubCategory._id}
                    value={superSubCategory._id}
                  >
                    {superSubCategory.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 bg-blue-500 text-white rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
