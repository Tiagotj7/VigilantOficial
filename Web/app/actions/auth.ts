"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
} | null;

function normalizeEmail(value: FormDataEntryValue | null) {
  return String(value ?? "").normalize("NFKC").trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Preencha email e senha." };
  }

  if (!isValidEmail(email)) {
    return { error: "Informe um endereço de email válido." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email ou senha inválidos." };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name || !email || !password) {
    return { error: "Preencha todos os campos." };
  }

  if (!isValidEmail(email)) {
    return { error: "Informe um endereço de email válido." };
  }

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." };
  }

  if (password.length < 8) {
    return { error: "A senha precisa ter pelo menos 8 caracteres." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Se a confirmação de email estiver ativada no projeto Supabase,
  // signUp() não retorna uma sessão — o usuário precisa confirmar o
  // email antes de logar.
  if (!data.session) {
    redirect("/login?checkEmail=1");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}
