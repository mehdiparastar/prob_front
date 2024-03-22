import React, { useState, useEffect } from 'react';

const CheckInternetConnection: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online',  updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div>
      {isOnline ? 'Internet connection is OK' : 'No internet connection'}
    </div>
  );
};

export default CheckInternetConnection;
