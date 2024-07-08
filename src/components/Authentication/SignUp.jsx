import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { registerUser } from "@/services/services";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SignUpHandler = async () => {
    setLoading(true);
    const user = await registerUser({ username, email, fullname, password });
    if (user) navigate("/auth/login");
    setLoading(false);
    setEmail("");
    setPassword("");
    setFullname("");
    setUsername("");
  };
  return (
    <div className="w-[40vw] flex flex-col gap-5 items-center">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
        <Label htmlFor="fullname">Full Name</Label>
        <Input
          type="text"
          id="fullname"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
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
            <Button type="submit" onClick={SignUpHandler} disabled={loading}>
              {loading ? "Loading" : "SignUp"}
            </Button>
            <Link to="/auth/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
