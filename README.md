# Next.js PWA Example with Mobile Notifications

A comprehensive Progressive Web App (PWA) example built with **Next.js 16**, featuring mobile notifications, offline functionality, and installability.

## 🚀 Features

- ✅ **Latest Next.js 16** with App Router
- ✅ **Progressive Web App (PWA)** capabilities
- ✅ **Mobile Push Notifications** with actions and vibration
- ✅ **Offline Support** via Service Worker
- ✅ **Installable** on mobile and desktop devices
- ✅ **Responsive Design** with Tailwind CSS
- ✅ **Dark Mode** support
- ✅ **TypeScript** for type safety
- ✅ **Web App Manifest** with comprehensive metadata

## 📱 PWA Capabilities

### Web App Manifest

The app includes a complete `manifest.json` with:
- **Name & Short Name**: "Next.js PWA Example with Notifications" / "NextJS PWA"
- **Description**: Detailed app description for app stores
- **Icons**: Multiple sizes (192x192, 384x384, 512x512) for various devices
- **Display Mode**: Standalone for native app-like experience
- **Theme Colors**: Black theme with white background
- **Categories**: Education, Productivity

### Push Notifications

The app demonstrates various notification types:

1. **Welcome Notification**: Greet new users
2. **Message Notification**: Simulate incoming messages
3. **Reminder Notification**: Time-based alerts
4. **Achievement Notification**: Celebrate user milestones

Each notification includes:
- Custom icon and badge
- Vibration patterns (200ms, 100ms, 200ms)
- Action buttons (Explore, Close)
- Notification tags for grouping
- Custom data payload

### Service Worker

Automatically generated service worker provides:
- Offline page caching
- Asset caching strategies
- Background sync capabilities
- Push notification handling

## 🛠️ Installation

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Krugou/nextjspwaexample.git
cd nextjspwaexample
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

Build the production-ready PWA:

```bash
npm run build
npm start
```

The build process will:
- Generate optimized bundles
- Create service worker files
- Generate PWA assets
- Prepare manifest files

## 📦 Project Structure

```
nextjspwaexample/
├── app/
│   ├── layout.tsx          # Root layout with PWA metadata
│   ├── page.tsx            # Main page with notification demo
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Favicon
├── public/
│   ├── manifest.json       # PWA manifest configuration
│   ├── icon-192x192.png    # App icon (192x192)
│   ├── icon-384x384.png    # App icon (384x384)
│   └── icon-512x512.png    # App icon (512x512)
├── next.config.ts          # Next.js configuration with PWA
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🎯 Usage

### 1. Request Notification Permission

Click the "Request Permission" button to enable browser notifications. This is required before sending any notifications.

### 2. Test Notifications

Try the four different notification examples:
- **Welcome**: Test basic notification
- **Message**: Simulate a message notification
- **Reminder**: Test reminder-style notification
- **Achievement**: Celebrate with an achievement notification

### 3. Install the PWA

Click "Install App" to add the application to your device's home screen. The app will then work like a native application with:
- Its own icon on the home screen
- Splash screen on launch
- Full-screen experience
- Offline functionality

### 4. Test Offline Mode

After visiting the site once:
1. Turn off your network connection
2. Navigate to the app
3. The app continues to work offline

## 🔧 Configuration

### Manifest Customization

Edit `public/manifest.json` to customize:
- App name and description
- Theme and background colors
- Icon sizes and purposes
- Display mode
- Categories and screenshots

### Service Worker Configuration

The service worker is implemented in `public/sw.js` and provides:
- Offline caching for essential resources
- Background notification handling
- Custom cache management

To modify caching behavior, edit `public/sw.js`:
```javascript
const CACHE_NAME = 'nextjs-pwa-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
];
```

## 📚 Technologies Used

- **Next.js 16.0.1**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **Service Worker API**: For offline functionality and notifications

## 🌐 Browser Support

The PWA features work best on:
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (iOS 16.4+)
- ⚠️ Safari Desktop (Limited notification support)

## 📱 Testing on Mobile

### iOS
1. Open Safari on iOS
2. Navigate to your deployed app
3. Tap the Share button
4. Select "Add to Home Screen"

### Android
1. Open Chrome on Android
2. Navigate to your deployed app
3. Tap the menu (three dots)
4. Select "Install app" or "Add to Home Screen"

## 🚀 Deployment

This app can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
The app works on any platform supporting Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted

**Important**: Ensure HTTPS is enabled for PWA features to work properly.

## 🔐 Security Considerations

- Notifications require HTTPS in production
- Service workers only work over HTTPS (except localhost)
- Always request notification permission explicitly
- Handle denied permissions gracefully

## 📝 Example Notification Code

```typescript
const sendNotification = (title: string, body: string, tag?: string) => {
  if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        body: body,
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: tag,
        vibrate: [200, 100, 200],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [
          { action: 'explore', title: 'Explore' },
          { action: 'close', title: 'Close' },
        ],
      });
    });
  }
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 💡 Tips

1. **Test in Production**: Some PWA features only work over HTTPS
2. **Clear Cache**: Use DevTools to clear service worker cache during development
3. **Mobile Testing**: Test on real devices for the best experience
4. **Lighthouse**: Use Chrome Lighthouse to audit PWA capabilities
5. **Debug**: Use Chrome DevTools Application tab to debug service workers

---

Made with ❤️ using Next.js 16
