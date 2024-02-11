import AuthForm from "../components/AuthForm";

export default function SignIn() {
  return (
    <div className="container">
      <div className="row">
        <h2 className="col-md-4 text-center offset-4 text-white">Sign In</h2>
        <div className="col-md-4 offset-4">
          <AuthForm type="signin" />
        </div>
      </div>
    </div>
  );
}
