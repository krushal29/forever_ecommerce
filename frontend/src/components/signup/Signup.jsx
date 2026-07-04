import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/signup`, {
        name,
        email,
        password,
      });

      if (response.data.message) {
        login(response.data.token, response.data.user);
        toast.success("Account created successfully! Welcome to Forever.");
        setTimeout(() => navigate("/"), 1200);
      } else {
        toast.error(response.data.data || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.data || "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "75vh",
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
          }}>CREATE ACCOUNT</h2>
          <span className="line" style={{ margin: "0 auto" }}></span>
        </div>

        <form onSubmit={handlePost} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="reg-name" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>YOUR NAME</label>
            <input
              id="reg-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="reg-email" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>EMAIL ADDRESS</label>
            <input
              id="reg-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="reg-password" style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-secondary)", letterSpacing: "0.05em" }}>PASSWORD</label>
            <input
              id="reg-password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }} disabled={loading}>
            {loading ? "CREATING..." : "REGISTER"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--color-secondary)" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: "600", textDecoration: "underline" }}>Login here</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
