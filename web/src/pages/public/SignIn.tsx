import LoginForm from "@/components/form/login";

export default function SignIn() {
  return (
    <div>
      <LoginForm type="client" />
      <LoginForm type="restaurant" />
      <LoginForm type="admin" />
    </div>
  );
}
