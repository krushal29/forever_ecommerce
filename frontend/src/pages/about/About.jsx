//Components
import Choose from "../../components/aboutChoose/Choose";
import AboutUs from "../../components/aboutus/AboutUs";
import Layout from "../../components/layout/Layout";
import Subscribe from "../../components/Subscribe/Subscribe";

const About = () => {
  return (
    <Layout>
      <AboutUs />
      <Choose />
      <Subscribe />
    </Layout>
  );
};

export default About;
