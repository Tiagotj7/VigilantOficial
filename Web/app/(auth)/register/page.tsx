import AuthCard from "@/components/auth/auth-card";
import AuthContainer from "@/components/auth/auth-container";
import AuthHeader from "@/components/auth/auth-header";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthContainer>

      <AuthCard>

        <AuthHeader
          title="Criar Conta"
          subtitle="Comece gratuitamente e monitore seus serviços em minutos."
        />

        <RegisterForm />

      </AuthCard>

    </AuthContainer>
  );
}