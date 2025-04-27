import React, { useEffect, useState } from 'react';
import './App.css';
import { LeftPanel } from './components/layouts/LeftPanel/LeftPanel';
import { Header } from './components/Header/Header';
import { Body } from './components/layouts/Body/Body';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalList } from './components/JournalList/JournalList';
import { JournalForm } from './components/JournalForm/JournalForm';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('notes-data'));
    if (data) {
      setItems(
        data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem('notes-data', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems((oldItems) => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id:
          oldItems.length > 0 ? Math.max(...oldItems.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
