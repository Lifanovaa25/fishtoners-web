install:
	pnpm install

start:
	pnpm dev

supabase.init:
	pnpm supabase init

supabase.login:
	pnpm supabase login

supabase.link:
	pnpm supabase link --project-ref $(project)

supabase.start:
	pnpm supabase start

supabase.start.db-only:
	pnpm supabase db start

supabase.stop:
	pnpm supabase stop

supabase.migrations.pull:
	pnpm supabase db pull

supabase.migrations.diff.local:
	pnpm supabase db diff -f $(name) --local

supabase.migrations.new:
	pnpm supabase migration new $(name)

supabase.generate.types:
	pnpm supabase gen types typescript --local > ./src/shared/api/database.types.ts
