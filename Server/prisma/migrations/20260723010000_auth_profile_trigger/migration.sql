-- Sincroniza o Supabase Auth (schema auth, gerenciado pelo Supabase) com o
-- schema public (gerenciado pelo Prisma): sempre que um usuário se
-- registra, cria automaticamente o profile, uma organização padrão e o
-- vínculo (membership) como OWNER.
--
-- Isso é o caminho "feliz" e instantâneo. O backend (OrganizationsService)
-- também tem um fallback idempotente para o caso desta trigger ainda não
-- ter sido aplicada em um projeto Supabase existente.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_org_id uuid;
BEGIN
  INSERT INTO public.profiles (id, email, name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'name',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.organizations (id, name, slug, created_at, updated_at)
  VALUES (
    gen_random_uuid(),
    'Meu workspace',
    'org-' || substr(NEW.id::text, 1, 8),
    now(),
    now()
  )
  RETURNING id INTO new_org_id;

  INSERT INTO public.memberships (id, role, organization_id, profile_id, created_at)
  VALUES (gen_random_uuid(), 'OWNER', new_org_id, NEW.id, now());

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
