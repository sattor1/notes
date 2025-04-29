import './App.css';
import { LeftPanel } from './components/layouts/LeftPanel/LeftPanel';
import { Header } from './components/Header/Header';
import { Body } from './components/layouts/Body/Body';
import { JournalAddButton } from './components/JournalAddButton/JournalAddButton';
import { JournalList } from './components/JournalList/JournalList';
import { JournalForm } from './components/JournalForm/JournalForm';
import { useLocalStorage } from './components/hooks/use-localstorage.hook';

function App() {
  const [items, setItems] = useLocalStorage('notes-data');

  const mapItems = (items) => {
    if (!items) {
      return [];
    }
    return items.map((i) => ({
      ...i,
      date: new Date(i.date),
    }));
  };

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={mapItems(items)} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  );
}

export default App;
