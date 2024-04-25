import { Link } from "react-router-dom";

import LoginForm from "../../components/forms/login-form";

function LoginPage() {
  return (
    <main className="pt-16 pb-8 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-[calc(100vh-3.25rem)]">
      <section className="flex flex-col items-center justify-center py-4 space-y-4">
        <LoginForm />
        <Link
          to="/signup"
          className="opacity-0 font-Poppins text-sm text-center text-custom_pink hover:underline md:text-base animate-slideup [--slideup-delay:600ms]"
        >
          Dont have an account? Signup
        </Link>
      </section>
    </main>
  );
}

export default LoginPage;
