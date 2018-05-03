import React from 'react';
import styles from './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h2>TWITTER COMPONENT<span role="img" aria-label="emoji">😎</span></h2>
        </div>
      </div>
    );
  }
}


export default App;