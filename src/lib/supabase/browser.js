import { createBrowserClient } from "@supabase/ssr";

// Anon-key client for Client Components — used where the browser itself
// needs to talk to Supabase directly (e.g. redirecting to an OAuth provider).
let client;

export function supabaseBrowser() {
  if (client) return client;
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return client;
}
