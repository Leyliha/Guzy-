import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login } from "../../redux/apiCalls";
const Login = () => {
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.currentUser)
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { email, psw });
      if (await user) {
        console.log('Login Successful')
        navigate('/')
      }else{
        console.log("error")
      }
    } catch (e) {
      navigate('/login')
      console.log(e)
    }
  };

  return (
    <div
      style={{
        flex: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        name="psw"
        placeholder="password"
        onChange={(e) => setPsw(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
