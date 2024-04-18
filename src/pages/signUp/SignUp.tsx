import Textfield from "../../components/atoms/textfield/Textfield";


export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <Textfield placeholder="Email" />
      <Textfield placeholder="Password" />
    </div>
  );
}