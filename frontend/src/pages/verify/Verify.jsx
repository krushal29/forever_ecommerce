import { useEffect, useContext, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import { Oval } from 'react-loader-spinner';
import './Verify.css';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { api, refreshCart } = useContext(AuthContext);
  const navigate = useNavigate();
  const verificationStarted = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await api.post('/api/delivery/verifyStripe', { success, orderId });
        if (response.data.success) {
          toast.success("Payment successful! Redirecting to orders...");
          await refreshCart();
          setTimeout(() => navigate('/orders'), 2000);
        } else {
          toast.error("Payment failed or cancelled. Redirecting to cart...");
          setTimeout(() => navigate('/cart'), 2000);
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred. Redirecting to cart...");
        setTimeout(() => navigate('/cart'), 2000);
      }
    };

    if (orderId && !verificationStarted.current) {
      verificationStarted.current = true;
      verifyPayment();
    } else if (!orderId) {
      navigate('/cart');
    }
  }, [success, orderId]);

  return (
    <Layout>
      <div className="verify-container">
        <div className="verify-box">
          <Oval color="var(--color-primary)" secondaryColor="var(--color-border)" height={50} width={50} />
          <h2>Verifying your payment...</h2>
          <p>Please do not close this window or click the back button.</p>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Verify;
