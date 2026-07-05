# GitHub Actions Deployment Setup

This project uses GitHub Actions to automatically deploy to Cloudflare Pages whenever you push to the main/master branch.

## 🔧 Setup Instructions

### Step 1: Get Your Cloudflare Credentials

1. **Get your Account ID:**
   - Go to https://dash.cloudflare.com
   - Select your account
   - Copy the **Account ID** from the right sidebar

2. **Create an API Token:**
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click **Create Token**
   - Use the **Edit Cloudflare Workers** template
   - Or create a custom token with these permissions:
     - Account → Cloudflare Pages → Edit
   - Copy the generated token (you won't see it again!)

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/ShahzaibRao/video-downloader
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: (paste your API token from Step 1)

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: (paste your Account ID from Step 1)

5. Click **Add secret** for each

### Step 3: Push Your Code

Once the secrets are added, every push to main/master will automatically deploy to Cloudflare Pages!

```bash
git push origin master
```

### Step 4: Monitor Deployment

- Go to the **Actions** tab in your GitHub repository
- Watch the deployment progress in real-time
- Deployment typically takes 30-60 seconds

## 🎯 What Happens on Each Push

1. GitHub Actions checks out your code
2. Deploys the `public` folder to Cloudflare Pages
3. Cloudflare builds and deploys globally
4. Your site updates at: `https://video-downloader.pages.dev`

## 🔄 Workflow Triggers

The workflow runs on:
- ✅ Push to `main` or `master` branch
- ✅ Pull requests to `main` or `master` (preview deployment)

## 📊 Deployment Status

You can see deployment status:
- GitHub Actions tab: Build and deployment logs
- Cloudflare Dashboard: Deployment history and analytics

## 🐛 Troubleshooting

### "Secret not found"
- Make sure you added both `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository secrets
- Check the secret names match exactly (case-sensitive)

### "Unauthorized"
- Verify your API token has Cloudflare Pages edit permissions
- Check if the token has expired

### "Project not found"
- The first deployment will create the project automatically
- Make sure `projectName: video-downloader` in the workflow matches your desired project name

## 🎨 Customization

To change the project name or deployment settings, edit `.github/workflows/deploy.yml`:

```yaml
projectName: video-downloader  # Change this to your preferred name
directory: public              # Change if your static files are elsewhere
```

## 📝 Manual Deployment

You can still deploy manually using Wrangler:

```bash
wrangler pages deploy public --project-name video-downloader
```

---

**Next Step:** Add the GitHub secrets, then push your code. Your site will be live in seconds! 🚀
