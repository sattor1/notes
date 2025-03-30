import React from 'react';
import './App.css';
import { LeftPanel } from './components/layouts/LeftPanel/LeftPanel';
import { Header } from './components/Header/Header';
import { Body } from './components/layouts/Body/Body';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalList } from './components/JournalList/JournalList';
import { JournalForm } from './components/JournalForm/JournalForm';

function App() {
  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList />
      </LeftPanel>
      <Body>
        <JournalForm />
      </Body>
    </div>
  );
}

export default App;
