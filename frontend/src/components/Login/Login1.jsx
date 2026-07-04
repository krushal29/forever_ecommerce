import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Login1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.message) {
        login(response.data.token, response.data.user);
        toast.success("Welcome back!");
        setTimeout(() => navigate("/"), 1200);
      } else {
        toast.error(response.data.data || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.data || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
      backgroundColor: "var(--color-bg-main)"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "36px",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-lg)",
        backgroundColor: "var(--color-bg-main)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "500",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-display)",
            marginBottom: "8px"
          }}>LOGIN</h2>
          <span className="line" style={{ margin: "0 auto" }}></span>
        </div>

        <form onSubmit={handlePost} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="login-email" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>EMAIL ADDRESS</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="login-password" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>PASSWORD</label>
            </div>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }} disabled={loading}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--color-secondary)" }}>
          Don't have an account? <Link to="/signup" style={{ color: "var(--color-primary)", fontWeight: "600", textDecoration: "underline" }}>Create Account</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login1;
