import '../policy/Policy.css';
import exchange from '../../assets/ExchangePolicy.png';
import customer from '../../assets/customersupport.png';
import return1 from '../../assets/ReturnPolicy.png';

const policies = [
  {
    img: exchange,
    title: "Easy Exchange Policy",
    desc: "We offer a hassle-free exchange policy — no questions asked."
  },
  {
    img: return1,
    title: "7 Days Return Policy",
    desc: "Not satisfied? Return any item within 7 days for a full refund."
  },
  {
    img: customer,
    title: "Best Customer Support",
    desc: "Our dedicated support team is available 24/7 to assist you."
  }
];

const Policy = () => {
  return (
    <div className="policy">
      <div className="policy1">
        {policies.map((policy, i) => (
          <div key={i} className="ExchangePolicy">
            <div className="policyImg">
              <img src={policy.img} alt={policy.title} />
            </div>
            <h4>{policy.title}</h4>
            <div className="detail_p">
              <p>{policy.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;