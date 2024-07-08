import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginUser } from "@/services/services";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const LoginHandler = async () => {
    setLoading(true);
    const user = await loginUser({ email, password });
    if (user) navigate("/");
    setLoading(false);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="w-[40vw] flex flex-col gap-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="pasword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-center pt-5 gap-10">
          <Button type="submit" onClick={LoginHandler} disabled={loading}>
            {loading ? "Loading" : "Login"}
          </Button>
          <Link to="/auth/signUp">
            <Button>SignUp</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
