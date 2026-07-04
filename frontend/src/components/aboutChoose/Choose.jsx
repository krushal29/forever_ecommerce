import "../aboutChoose/Choose.css";
import { FiAward, FiTruck, FiHeadphones } from "react-icons/fi";

const Choose = () => {
  const features = [
    {
      icon: <FiAward size={28} />,
      title: "Quality Assurance",
      desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards."
    },
    {
      icon: <FiTruck size={28} />,
      title: "Convenience",
      desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier."
    },
    {
      icon: <FiHeadphones size={28} />,
      title: "Exceptional Customer Service",
      desc: "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority."
    }
  ];

  return (
    <div className="why-choose-wrapper">
      <div className="section-header why-choose-header">
        <div className="section-title">
          <h2><span>WHY</span> CHOOSE US</h2>
          <span className="line"></span>
        </div>
      </div>

      <div className="choose-cards-grid">
        {features.map((feature, i) => (
          <div key={i} className="choose-card">
            <div className="choose-card-icon">{feature.icon}</div>
            <h4>{feature.title}</h4>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
