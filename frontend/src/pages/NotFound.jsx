import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '24px',
        backgroundColor: 'var(--color-bg-main)'
      }}>
        <h1 style={{
          fontSize: '72px',
          fontWeight: '700',
          color: 'var(--color-primary)',
          marginBottom: '16px',
          fontFamily: 'var(--font-primary)'
        }}>404</h1>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '500',
          color: 'var(--color-primary)',
          marginBottom: '12px'
        }}>Page Not Found</h2>
        <p style={{
          color: 'var(--color-secondary)',
          fontSize: '15px',
          maxWidth: '460px',
          marginBottom: '32px'
        }}>
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Link to="/" className="btn btn-primary" style={{ minWidth: '160px' }}>
          Go to Homepage
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
