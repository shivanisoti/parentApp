import React, { useRef } from 'react';

const ParentApp = () => {
  const iframeRef = useRef(null);

  const callIframeFunction = () => {
    // Post a message to the iframe to trigger the function call
    iframeRef.current.contentWindow.postMessage('callMyFunctionInIframe', 'https://iframe-app-sand.vercel.app');
  };

  // Listen for messages from the iframe
  const handleMessage = (event) => {
    console.log('event', event);
    if (event.origin == 'https://iframe-app-sand.vercel.app' && event.data == 'FunctionExecuted') {
      console.log('Function in iframe executed successfully');
    }
  };

  // Attach the event listener
  window.addEventListener('message', handleMessage);

  return (
    <div>
      <h1>Parent App</h1>
          <button onClick={callIframeFunction}>Call Iframe Function</button>
          <br/>
      <iframe ref={iframeRef} src="https://iframe-app-sand.vercel.app" title="Your Iframe"></iframe>
    </div>
  );
};

export default ParentApp;
