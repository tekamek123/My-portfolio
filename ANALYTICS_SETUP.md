# Analytics Setup Guide

## Google Analytics 4 Integration

Your portfolio now includes Google Analytics 4 (GA4) integration for tracking user interactions and page views.

## Setup Instructions

### 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Create a new property for your portfolio
4. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Environment Variable

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### 3. Deploy

The analytics will automatically work in production. In development mode, analytics are disabled to avoid tracking test data.

## What's Being Tracked

### Page Views
- Automatic tracking of all page navigation
- Route changes are tracked automatically

### User Interactions

1. **Button Clicks**
   - Navigation buttons
   - Resume download buttons
   - Theme toggle

2. **Link Clicks**
   - External links (GitHub, deployment URLs)
   - Social media links
   - Project links

3. **Downloads**
   - Resume PDF downloads
   - Certificate downloads

4. **Form Submissions**
   - Contact form submissions (success/error)

5. **Project Views**
   - When users view project details

6. **GitHub Interactions**
   - GitHub profile views
   - Repository clicks

7. **Social Media Clicks**
   - All social platform links

8. **Theme Toggle**
   - Light/dark mode switches

## Custom Events

The analytics system tracks the following custom events:

- `click` - Button and link clicks
- `download` - File downloads
- `form_submit` - Form submissions
- `view` - Section and project views
- `toggle` - Theme changes
- `search` - Search functionality (if added)

## Viewing Analytics

1. Go to your Google Analytics dashboard
2. Navigate to **Reports** > **Engagement** > **Events**
3. View detailed analytics about user interactions

## Privacy

- Analytics only runs in **production** mode
- No personal data is collected
- Complies with GDPR (no cookies used by default)
- Users can opt-out using browser extensions

## Disabling Analytics

To disable analytics, simply don't set the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable, or set it to an empty string.

## Testing

To test analytics in development:

1. Temporarily remove the production check in `src/app/lib/analytics.ts`
2. Add your Measurement ID to `.env.local`
3. Test interactions and check Google Analytics Real-Time reports

**Note:** Remember to restore the production check before deploying!

