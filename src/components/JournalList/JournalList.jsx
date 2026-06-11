import { useContext } from 'react';
import { CardButton } from '../CardButton/CardButton';
import { JournalItem } from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

export const JournalList = ({ items }) => {
  const { userId } = useContext(UserContext);

  let list = <p>Записей пока нет, добавьте первую</p>;

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  if (items.length > 0) {
    list = items
      .filter((i) => i.userId === userId)
      .sort(sortItems)
      .map((el) => (
        <CardButton key={el.id}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ));
  }

  return <div className="journal-list">{list}</div>;
};
