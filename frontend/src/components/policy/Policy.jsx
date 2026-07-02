import '../policy/Policy.css'


// all Img
import exchange from '../../assets/ExchangePolicy.png'
import customer from '../../assets/customersupport.png'
import return1 from '../../assets/ReturnPolicy.png'

const Policy = () => {
  return (
    <div className="policy">
        <div className="policy1">
            <div className="ExchangePolicy">
                <div className="policyImg">
                    <img src={exchange} alt="" />
                </div>
                <div className="detail_h4">
                    <h4>Easy Exchange Policy</h4>
                </div>
                <div className="detail_p">
                    <p>We offer hassle free exchange policy</p>
                </div>
            </div>
            

            <div className="ReturnPolicy">
                <div className="policyImg">
                    <img src={return1} alt="" />
                </div>
                <div className="detail_h4">
                    <h4>7 Days Return Policy</h4>
                </div>
                <div className="detail_p">
                    <p>We provide 7 days free return policy</p>
                </div>
            </div>



            <div className="customersupport">
                <div className="policyImg">
                    <img src={customer} alt="" />
                </div>
                <div className="detail_h4">
                    <h4>Best customer support</h4>
                </div>
                <div className="detail_p">
                    <p>we provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Policy