import ForgotPasswordForm from "../../components/forms/forgot_password-form";

function ForgotPasswordPage() {
  return (
    <main className="pt-16 pb-8 md:pt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 min-h-[calc(100vh-3.25rem)]">
      <section className="flex flex-col items-center justify-center py-4 space-y-4">
        <ForgotPasswordForm />
      </section>
    </main>
  );
}

export default ForgotPasswordPage;
