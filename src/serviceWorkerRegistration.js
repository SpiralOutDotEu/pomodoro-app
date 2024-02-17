export const register = () => {
    if ('serviceWorker' in navigator) {
      // The window load event guarantees that the service worker will not
      // try to register until after the first page has been loaded
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then(registration => {
            console.log('Service Worker registered: ', registration);
  
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              if (installingWorker == null) {
                return;
              }
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // At this point, the updated pre-cached content has been fetched,
                    // but the previous service worker will still serve the older content
                    // until all client tabs are closed.
                    console.log('New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://bit.ly/CRA-PWA.');
                    // Execute callback
                    if (window.confirm('A new version of this web app is available. Load the new version?')) {
                      window.location.reload();
                    }
                  } else {
                    // At this point, everything has been pre-cached.
                    // It's the perfect time to display a
                    // "Content is cached for offline use." message.
                    console.log('Content is cached for offline use.');
                  }
                }
              };
            };
          })
          .catch(error => {
            console.error('Error during service worker registration:', error);
          });
      });
    }
  };
  
  // Function to check if the service worker can be unregistered
  export const unregister = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  };
  