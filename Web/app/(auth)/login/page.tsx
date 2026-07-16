import AuthCard from "@/components/auth/auth-card";
import AuthContainer from "@/components/auth/auth-container";
import AuthHeader from "@/components/auth/auth-header";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthContainer>

      <AuthCard>

        <AuthHeader
          title="Entrar"
          subtitle="Acesse sua conta para monitorar sua infraestrutura."
        />

        <LoginForm />

      </AuthCard>

    </AuthContainer>
  );
}