import Link from "next/link";

import FormContainer from "../components/FormContainer";

interface SignupProps {}

const Signup: React.FC<SignupProps> = (props: SignupProps) => {
  const handleSignupClick = () => {
    console.log("TODO: handle signup");
  };

  return (
    <FormContainer>
      <form onSubmit={handleSignupClick}>
        <label htmlFor="Username">Username</label>
        <input type="text" placeholder="Username" autoComplete="on" />
        <label htmlFor="Password">Password</label>
        <input type="password" placeholder="Password" autoComplete="off" />
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" autoComplete="off" />
        <input type="submit" value="SIGN UP" />
      </form>
      <br />
      <Link href="/login">Already have an account? Log in.</Link>
    </FormContainer>
  );
};

export default Signup;
