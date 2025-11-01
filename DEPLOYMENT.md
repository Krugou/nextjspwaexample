# GitHub Pages Deployment Instructions

This document explains how to enable GitHub Pages for this Next.js PWA after merging this PR.

## Prerequisites

- Repository owner/admin access to enable GitHub Pages
- The PR with the deployment workflow must be merged to the `main` branch

## Steps to Enable GitHub Pages

### 1. Configure GitHub Pages Settings

After merging this PR to the main branch:

1. Go to your repository on GitHub: https://github.com/Krugou/nextjspwaexample
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - This allows the GitHub Actions workflow to deploy to Pages

### 2. Workflow Permissions (if needed)

If the deployment fails with a permissions error:

1. Go to **Settings** > **Actions** > **General**
2. Scroll down to **Workflow permissions**
3. Ensure either:
   - "Read and write permissions" is selected, OR
   - "Read repository contents and packages permissions" with the option "Allow GitHub Actions to create and approve pull requests" enabled

### 3. Trigger the First Deployment

The workflow will automatically run when code is pushed to the `main` branch. To manually trigger it:

1. Go to the **Actions** tab
2. Click on "Deploy Next.js PWA to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select the `main` branch
5. Click "Run workflow"

### 4. Access Your Deployed Site

Once the workflow completes successfully:

- Your site will be available at: **https://krugou.github.io/nextjspwaexample/**
- The workflow takes about 1-2 minutes to complete

## What the Workflow Does

1. **Build Job**:
   - Checks out the code
   - Sets up Node.js 20
   - Installs dependencies with `npm ci`
   - Builds the Next.js app with static export
   - Uploads the build artifacts to GitHub Pages

2. **Deploy Job**:
   - Deploys the artifacts to GitHub Pages
   - Makes the site live at the GitHub Pages URL

## Configuration Details

The application has been configured for GitHub Pages with:

- **Base Path**: `/nextjspwaexample` (matches repository name)
- **Static Export**: Generates static HTML/CSS/JS files
- **PWA Support**: Manifest and service worker configured for the correct paths
- **.nojekyll**: Prevents Jekyll from processing the `_next` directory

## Troubleshooting

### Workflow Fails with Permission Error

If you see an error like "Resource not accessible by integration":

1. Go to **Settings** > **Actions** > **General** > **Workflow permissions**
2. Select "Read and write permissions"
3. Save the changes
4. Re-run the workflow

### Site Returns 404

1. Verify GitHub Pages is enabled in repository settings
2. Check that the source is set to "GitHub Actions"
3. Verify the workflow completed successfully
4. Wait a few minutes for GitHub's CDN to update

### PWA Features Not Working

1. Ensure you're accessing the site via HTTPS (GitHub Pages URL)
2. Clear browser cache and service workers
3. Check browser console for errors

## Updating the Deployment

After any code changes pushed to `main`:

1. The workflow runs automatically
2. No manual intervention needed
3. Site updates in 1-2 minutes

## Local Development

For local development without the basePath:

You can create a `.env.local` file and configure Next.js to use different settings, or temporarily comment out the `basePath` in `next.config.ts` and update `app/config.ts` accordingly.

## Support

If you encounter issues:

1. Check the Actions tab for workflow logs
2. Review the error messages in the workflow output
3. Ensure all required permissions are granted
