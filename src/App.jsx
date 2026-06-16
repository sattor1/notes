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
  const [editItem, setEditItem] = useState(null);

  const mapItems = (items) => {
    if (!items) {
      return [];
    }
    return items.map((i) => ({
      ...i,
      date: new Date(i.date),
    }));
  };

  const deleteItem = (item) => {
    if (item) {
      setItems(mapItems(items).filter((i) => i.id !== item.id));
      setEditItem(null);
    }
  };

  const addItem = (item) => {
    if (editItem) {
      setItems([
        ...mapItems(items).map((i) =>
          i.id === editItem.id
            ? { ...item, date: new Date(item.date), id: editItem.id }
            : i,
        ),
      ]);
      setEditItem(null);
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
          <JournalAddButton onClick={() => setEditItem(null)} />
          <JournalList items={mapItems(items)} setEditItem={setEditItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            editItem={editItem}
            onSubmit={addItem}
            deleteItem={deleteItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
