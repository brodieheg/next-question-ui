import AuthForm from "../components/AuthForm";
export default function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <h2 className="col-md-4 text-center offset-4 text-white">Sign up</h2>
        <div className="col-md-4 offset-4">
          <AuthForm type="signup" />
        </div>
      </div>
    </div>
  );
}
