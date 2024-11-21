import React from 'react';
import { TokenProvider } from '../context/TokenContext';
import Header from '../components/Header';
import TokenList from '../components/TokenList';

const HomePage: React.FC = () => {
  return (
    <TokenProvider>
      <Header />
      <main>
        <TokenList />
      </main>
    </TokenProvider>
  );
};

export default HomePage;