import { useContext, useMemo } from 'react';
import { CardButton } from '../CardButton/CardButton';
import { JournalItem } from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

export const JournalList = ({ items, setEditItemId }) => {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((i) => i.userId === userId).sort(sortItems),
    [items, userId],
  );

  let list = <p>Записей пока нет, добавьте первую</p>;

  if (items.length > 0) {
    list = filteredItems.map((el) => (
      <CardButton
        key={el.id}
        onClick={() => setEditItemId((id) => (el.id === id ? null : el.id))}
      >
        <JournalItem title={el.title} post={el.post} date={el.date} />
      </CardButton>
    ));
  }

  return <div className="journal-list">{list}</div>;
};
