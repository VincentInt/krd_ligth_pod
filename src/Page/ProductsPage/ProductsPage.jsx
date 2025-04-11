import { useParams } from "react-router";
import Products from "../../Component/Products/Products";

const ProductsPage = () => {
  const params = useParams();
  
  return <Products typeParams={params.type} />;
};

export default ProductsPage;
