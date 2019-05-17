import React from 'react';
import homeStyle from './Home.module.css';

const Home = () => (
  <div className={homeStyle.container}>
    <p className="t-greeting">Приветствуем в почтовом клиенте!</p>
  </div>
);

export default Home;
