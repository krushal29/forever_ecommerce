import Layout from "../../components/layout/Layout"
import ProductDescription from '../../components/ProdectdetailComponent/ProductDescription';
import ProductDetail from "../../components/ProdectdetailComponent/ProductDetail"
import RelatedProduct from "../../components/RelatedProduct/RelatedProduct"

const Product = () => {
  return (
    <Layout>
        <ProductDetail/>
        <ProductDescription/>
        <RelatedProduct/>
    </Layout>
  )
}

export default Product