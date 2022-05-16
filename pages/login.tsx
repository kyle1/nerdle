import Link from "next/link";

import FormContainer from "../components/FormContainer";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const handleLoginClick = () => {
    console.log("TODO: handle login");
  };

  return (
    <FormContainer>
      <form onSubmit={handleLoginClick}>
        <label htmlFor="Username">Username</label>
        <input type="text" placeholder="Username" autoComplete="on" />
        <label htmlFor="Password">Password</label>
        <input type="password" placeholder="Password" autoComplete="off" />
        <input type="submit" value="Login" />
      </form>
      <br />
      <Link href="/signup">Don't have an account? Sign up.</Link>
    </FormContainer>
  );
};

export default Login;
