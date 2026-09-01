# Sudheer Kumar Veeravalli — Portfolio

Personal portfolio/landing site marketing Sudheer as a freelance/fractional DevOps &
Program delivery leader, and for full-time high-value roles. Plain HTML/CSS/JS —
no build step required.

## Local preview

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `my-portfolio`) and push this project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-portfolio.git
   git push -u origin main
   ```

2. On GitHub: go to the repo's **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`, then **Save**.
5. Your site will be live at `https://<your-username>.github.io/my-portfolio/`
   within a minute or two.

### Custom domain (optional)

Add a `CNAME` file at the repo root containing your domain (e.g. `sudheerveeravalli.com`),
then point your domain's DNS to GitHub Pages per
[GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing content

- All copy lives in `index.html`.
- Colors/typography/spacing live in `css/styles.css` (see `:root` for design tokens).
- Scroll reveal, animated counters, mobile nav, and the contact form's mailto
  behavior live in `js/main.js`.
- The downloadable résumé is `assets/Sudheer_Veeravalli_Resume.pdf` — replace this
  file (keep the same filename) whenever the résumé is updated.

## Contact form

The form currently builds a pre-filled `mailto:` link (no backend, no data stored
anywhere). If you want real form submissions without opening the visitor's email
client, wire it up to a service like [Formspree](https://formspree.io) or
[Web3Forms](https://web3forms.com) — add your endpoint back to the `<form>` tag's
`action` in `index.html` and remove the `submit` handler in `js/main.js`.
