import React, { useState, useEffect, useCallback } from 'react';
import '../assets/Css/AboutPage.css';

const AboutPage = () => {
  const [name, setName] = useState('');
  const [ext, setExt] = useState('');
  const [isWaiting, setIsWaiting] = useState(true);
  const [callId, setCallId] = useState(null);
  const [error, setError] = useState(null);

  const accessToken = '8wN9lHFOC0evmxTVXzCTINQ20qVPBgnL'; // Replace with your actual access token
  const acceptCallUrl = `/openapi/v1.0/call/accept_inbound?access_token=${accessToken}`;
  const rejectCallUrl = `/openapi/v1.0/call/reject_inbound?access_token=${accessToken}`;

  // Placeholder function to simulate incoming call detection
  const checkForIncomingCall = useCallback(async () => {
    // Since no API available for incoming call check, this is a placeholder
    // You might replace this with event-based notifications or other mechanisms
    console.log('Checking for incoming calls (simulated)');
  }, []);

  // Function to handle API calls for accepting or rejecting calls
  const handleApiCall = async (action) => {
    const url = action === 'accept' ? acceptCallUrl : rejectCallUrl;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callId }), // Send callId as part of the body
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Call ${action}d successfully:`, data);

        if (action === 'accept') {
          // Handle successful call acceptance
          // Add integration logic with Linkus or other client if necessary
        }
        setIsWaiting(true);
        setCallId(null);
        setName('');
        setExt('');
      } else {
        console.error(`API call failed (${action}):`, response.status, response.statusText);
        setError(`Failed to ${action} the call: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error during API call (${action}): ${error.message}`);
      console.error(`Error during API call (${action}):`, error);
    }
  };

  // Simulate polling mechanism (for demonstration purposes)
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkForIncomingCall();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [checkForIncomingCall]);

  const handleAnswerClick = () => {
    handleApiCall('accept');
  };

  const handleRejectClick = () => {
    handleApiCall('reject');
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <img
          src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.6435-9/74268828_2186597561640157_2831256456001486848_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEVhxxHEJ5CBu6xWmqBfKh545j-HUQhzUPjmP4dRCHNQ-SNMCsqbUSE3glWtCG-dNUfDX7mukqYOtm_wPAliXar&_nc_ohc=JDMlubRFAy0Q7kNvgGf4MgA&_nc_ht=scontent.fbkk12-2.fna&oh=00_AYAbxuGowO_y4wO0z2ks-wTvu4PKuzJHOJ1f9cZzghXB6A&oe=66E28FD4"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{name || 'No Call'}</h2>
        <p className="text-gray-600 mb-4">{ext ? `Ext. ${ext}` : 'No active extension'}</p>

        {isWaiting && !error && (
          <p className="text-gray-600 mb-4">Waiting for an incoming call...</p>
        )}

        {!isWaiting && callId && (
          <div className="flex justify-between mb-4">
            <button
              className="px-10 py-3 rounded-full button-answer"
              aria-label="Answer"
              onClick={handleAnswerClick}
            >
              Answer
            </button>
            <button
              className="px-11 py-2 rounded-full button-reject"
              aria-label="Reject"
              onClick={handleRejectClick}
            >
              Reject
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
