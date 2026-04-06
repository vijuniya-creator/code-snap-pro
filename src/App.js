import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { toPng } from 'html-to-image';

// Import a basic Prism theme for colors
import 'prismjs/themes/prism-tomorrow.css'; 

function App() {
  const [code, setCode] = useState('// Paste your code here...\nfunction helloWorld() {\n  console.log("Hello, Niya!");\n}');

  // This makes sure the colors update whenever you type new code
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const downloadImage = () => {
    const element = document.getElementById('my-code-card');
    if (!element) return;

    toPng(element, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'code-snippet.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ textAlign: 'center' }}>Code-to-Image Converter</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* INPUT BOX */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: '80%', height: '150px', borderRadius: '8px', padding: '10px', fontSize: '16px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
        />

        <button 
          onClick={downloadImage}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#61dafb', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          Download PNG
        </button>

        {/* THE PREVIEW (This becomes the image) */}
        <div id="my-code-card" style={{ padding: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px' }}>
          <div style={{ backgroundColor: '#1e1e1e', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', minWidth: '400px' }}>
            <div style={{ backgroundColor: '#333', padding: '10px', display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>
            <pre className="language-javascript" style={{ margin: 0, padding: '20px', fontSize: '16px' }}>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;