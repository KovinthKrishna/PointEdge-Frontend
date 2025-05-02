import React, { useState } from 'react';

const LaTeXLikeArray = () => {
  const numbers = [0, 2, 3, 4, '...', 10];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      fontFamily: 'CMU Serif, Latin Modern, serif',
      fontSize: '1.2em',
      fontWeight: 'bold',
      color: '#333',
      gap: '8px',
      letterSpacing: '0.8px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '8px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    }}>
      {numbers.map((number, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          style={{
            padding: '0 8px',
            margin: '0',
            lineHeight: '1.3',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: activeIndex === index ? '#008ED8' : (index % 2 === 0 ? '#e0e0e0' : '#fff'),
            color: activeIndex === index ? 'white' : (index % 2 === 0 ? '#444' : '#222'),
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default LaTeXLikeArray;