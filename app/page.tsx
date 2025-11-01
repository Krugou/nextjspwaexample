'use client';

import { useState, useEffect } from 'react';
import { config } from './config';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function Home() {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if app is installed
    const checkPWAInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsPWAInstalled(true);
      }
    };
    checkPWAInstalled();

    // Check notification permission
    const checkNotificationPermission = () => {
      if ('Notification' in window) {
        setNotificationPermission(Notification.permission);
      }
    };
    checkNotificationPermission();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const sendNotification = (title: string, body: string, tag?: string) => {
    if (notificationPermission !== 'granted') {
      alert('Please grant notification permission first');
      return;
    }

    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        const options = {
          body: body,
          icon: `${config.basePath}/icon-192x192.png`,
          badge: `${config.basePath}/icon-192x192.png`,
          tag: tag,
          vibrate: [200, 100, 200],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
          actions: [
            {
              action: 'explore',
              title: 'Explore',
            },
            {
              action: 'close',
              title: 'Close',
            },
          ],
        };
        registration.showNotification(title, options as NotificationOptions);
      });
    }
  };

  const installPWA = async () => {
    if (!deferredPrompt) {
      alert('PWA is already installed or installation prompt is not available');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsPWAInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js PWA Example
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Progressive Web App with Mobile Notifications
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isPWAInstalled ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {isPWAInstalled ? 'PWA Installed' : 'PWA Not Installed'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                notificationPermission === 'granted' ? 'bg-green-500' : 
                notificationPermission === 'denied' ? 'bg-red-500' : 'bg-gray-400'
              }`}></span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Notifications: {notificationPermission}
              </span>
            </div>
          </div>
        </div>

        {/* PWA Installation Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📱 PWA Installation
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Install this app on your device for a native app-like experience with offline support.
          </p>
          <button
            onClick={installPWA}
            disabled={isPWAInstalled || !deferredPrompt}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            {isPWAInstalled ? '✓ Already Installed' : 'Install App'}
          </button>
        </div>

        {/* Notification Permission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            🔔 Notification Permission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enable notifications to receive important updates and reminders.
          </p>
          <button
            onClick={requestNotificationPermission}
            disabled={notificationPermission === 'granted'}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            {notificationPermission === 'granted' ? '✓ Permission Granted' : 'Request Permission'}
          </button>
        </div>

        {/* Notification Examples Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📬 Send Test Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Try different notification examples below:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => sendNotification(
                'Welcome!',
                'Thanks for trying our PWA example app!',
                'welcome'
              )}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Welcome Notification
            </button>
            
            <button
              onClick={() => sendNotification(
                'New Message',
                'You have received a new message from the app',
                'message'
              )}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Message Notification
            </button>
            
            <button
              onClick={() => sendNotification(
                '⏰ Reminder',
                'This is your scheduled reminder notification',
                'reminder'
              )}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Reminder Notification
            </button>
            
            <button
              onClick={() => sendNotification(
                '🎉 Achievement Unlocked!',
                'You have successfully tested PWA notifications!',
                'achievement'
              )}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Achievement Notification
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ PWA Features
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Installable on mobile and desktop devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Works offline with service worker caching</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Push notifications with actions and vibration</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Responsive design for all screen sizes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Fast loading with Next.js optimization</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Dark mode support</span>
            </li>
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📖 How to Use
          </h2>
          <ol className="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside">
            <li>Click &quot;Request Permission&quot; to enable notifications</li>
            <li>Try sending test notifications using the buttons above</li>
            <li>Click &quot;Install App&quot; to add this PWA to your home screen</li>
            <li>On mobile, notifications will appear even when the app is closed</li>
            <li>The app works offline after the first visit</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
