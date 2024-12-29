import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [superSubCategory, setSuperSubCategory] = useState("");
  const [superSubCategories, setSuperSubCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch initial data for brands, categories, etc.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsRes = await fetch("http://localhost:4000/api/brands");
        const brandsData = await brandsRes.json();
        setBrands(brandsData);

        const categoriesRes = await fetch("http://localhost:4000/api/categories");
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        // Fetch the product details based on the ID
        const productRes = await fetch(`http://localhost:4000/api/product/${id}`);
        const productData = await productRes.json();
        setProduct(productData);
        setTitle(productData.title);
        setDescription(productData.description);
        setPrice(productData.price);
        setBrand(productData.brand);
        setCategory(productData.category);
        setSubCategory(productData.subcategory);
        setSuperSubCategory(productData.supersubcategory);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch initial data");
      }
    };
    fetchData();
  }, [id]);

  // Fetch subcategories based on selected category
  useEffect(() => {
    if (category) {
      const fetchSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/subcategory/category/${category}`
          );
          const data = await response.json();
          setSubCategories(data);
        } catch (error) {
          console.error("Failed to fetch subcategories", error);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [category]);

  // Fetch super subcategories based on selected subcategory
  useEffect(() => {
    if (subCategory) {
      const fetchSuperSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/supersubcategory/subcategory/${subCategory}`
          );
          const data = await response.json();
          setSuperSubCategories(data);
        } catch (error) {
          console.error("Failed to fetch super subcategories", error);
        }
      };
      fetchSuperSubCategories();
    } else {
      setSuperSubCategories([]);
    }
  }, [subCategory]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const selectedCategory = categories.find((cat) => cat._id === category);
    const selectedSubCategory = subCategories.find(
      (sub) => sub._id === subCategory
    );
    const selectedSuperSubCategory = superSubCategories.find(
      (superSub) => superSub._id === superSubCategory
    );

    const productData = new FormData();
    productData.append("title", title);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("brand", brand);
    productData.append("category", selectedCategory?.title || "");
    productData.append("subcategory", selectedSubCategory?.title || "");
    productData.append("supersubcategory", selectedSuperSubCategory?.title || "");
    if (image) {
      productData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/product/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: productData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update product: ${errorData.message}`);
      }

      // Redirect to product list page after successful submission
      navigate("/products/product-list");
    } catch (error) {
      setError(`Error updating product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">
            Edit Product
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={title}
                placeholder="Product Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <textarea
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <input
                type="number"
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={!category}
              >
                <option value="" disabled>Select SubCategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={superSubCategory}
                onChange={(e) => setSuperSubCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                disabled={!subCategory}
              >
                <option value="" disabled>Select Super SubCategory</option>
                {superSubCategories.map((superSubCategory) => (
                  <option key={superSubCategory._id} value={superSubCategory._id}>
                    {superSubCategory.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
