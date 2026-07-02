import Bestsellers from "../../components/bestsellers/Bestsellers";
import Herosection from "../../components/heroSection/Herosection";
import Latestcollection from "../../components/latestCollection/Latestcollection";
import Layout from "../../components/layout/Layout";
import Policy from "../../components/policy/Policy";
import Subscribe from "../../components/Subscribe/Subscribe";

const Homepage = () => {
  return (
    <Layout>
      <Herosection />
      <Latestcollection />
      <Bestsellers />
      <Policy />
      <Subscribe />
    </Layout>
  );
};

export default Homepage;
