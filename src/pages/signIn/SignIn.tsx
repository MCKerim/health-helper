import Textfield from "../../components/atoms/textfield/Textfield";


export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <Textfield placeholder="Email" />
      <Textfield placeholder="Password" />
    </div>
  );
}