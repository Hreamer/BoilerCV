import React from 'react';

const AccountInfo = () => {
  return (
    <div style={styles.container}>
      <div style={styles.square}>
        <p>Hello World!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  square: {
    width: '200px',
    height: '200px',
    backgroundColor: 'lightblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default AccountInfo;