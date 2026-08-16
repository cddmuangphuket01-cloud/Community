# Deploy

## GitHub Pages
1. Merge `agent/student-record-app` into `main`.
2. Repository Settings → Pages.
3. Source: GitHub Actions or Deploy from branch → `main` / root.
4. Put the resulting site URL into Supabase Auth URL Configuration.

## Netlify
Import the repository and use the root directory as the publish directory. `netlify.toml` is included.

## Vercel
Import the repository. `vercel.json` is included.
