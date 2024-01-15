import React from 'react';

export const Teacher = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <iframe
          title="fdsfsd"
          src="/students/2?teacher=true"
          style={{ width: '100%', height: '800px', border: '4px solid red' }}
        />
        <iframe
          title="fdsfsdf"
          src="/students/1?teacher=true"
          style={{ width: '100%', height: '800px', border: '4px solid blue' }}
        />
      </div>
    </div>
  );
};
