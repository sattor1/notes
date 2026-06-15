import './App.css';
import { LeftPanel } from './components/layouts/LeftPanel/LeftPanel';
import { Header } from './components/Header/Header';
import { Body } from './components/layouts/Body/Body';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalList } from './components/JournalList/JournalList';
import { JournalForm } from './components/JournalForm/JournalForm';
import { useLocalStorage } from './components/hooks/use-localstorage.hook';
import { UserContext, UserContextProvider } from './context/user.context';
import { useState } from 'react';

function App() {
  const [items, setItems] = useLocalStorage('notes-data');
  const [editItemId, setEditItemId] = useState(null);

  const mapItems = (items) => {
    if (!items) {
      return [];
    }
    return items.map((i) => ({
      ...i,
      date: new Date(i.date),
    }));
  };

  const editState = editItemId
    ? mapItems(items).find((item) => item.id === editItemId)
    : null;

  const addItem = (item) => {
    if (editItemId) {
      setItems([
        ...mapItems(items).map((i) =>
          i.id === editItemId
            ? { ...item, date: new Date(item.date), id: editItemId }
            : i,
        ),
      ]);
      setEditItemId(null);
      return;
    }

    setItems([
      ...mapItems(items),
      {
        ...item,
        date: new Date(item.date),
        id: items?.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton onClick={() => setEditItemId(null)} />
          <JournalList items={mapItems(items)} setEditItemId={setEditItemId} />
        </LeftPanel>
        <Body>
          <JournalForm editState={editState} onSubmit={addItem} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
