-- Seed manual para o Supabase SQL Editor.
--
-- 1. Em Authentication > Users, crie um usuário com o email abaixo e marque
--    "Auto Confirm User". Isso não envia email de confirmação.
-- 2. Troque o email em `test_email` e execute este script no SQL Editor.
-- 3. Use a senha definida no painel para entrar no aplicativo.
--
-- O script pode ser executado de novo: perfil, organização e membership não
-- serão duplicados.

do $$
declare
  test_email text := 'teste@exemplo.com';
  test_name text := 'Usuário de teste';
  test_org_name text := 'Organização de teste';
  test_org_slug text := 'organizacao-teste';
  test_user_id uuid;
  test_org_id uuid;
begin
  select id
    into test_user_id
    from auth.users
   where email = lower(test_email)
   limit 1;

  if test_user_id is null then
    raise exception
      'Usuário % não encontrado em auth.users. Crie-o primeiro em Authentication > Users com Auto Confirm User.',
      test_email;
  end if;

  insert into public.profiles (id, email, name)
  values (test_user_id, lower(test_email), test_name)
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name,
        updated_at = now();

  insert into public.organizations (id, name, slug)
  values (gen_random_uuid(), test_org_name, test_org_slug)
  on conflict (slug) do update
    set name = excluded.name,
        updated_at = now()
  returning id into test_org_id;

  insert into public.memberships (id, organization_id, profile_id, role)
  values (gen_random_uuid(), test_org_id, test_user_id, 'OWNER')
  on conflict (organization_id, profile_id) do update
    set role = excluded.role;
end
$$;
