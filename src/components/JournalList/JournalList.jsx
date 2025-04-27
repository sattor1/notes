import { CardButton } from '../CardButton/CardButton';
import { JournalItem } from '../JournalItem/JournalItem';
import './JournalList.css';

export const JournalList = ({ items }) => {
  let list = <p>Записей пока нет, добавьте первую</p>;

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  if (items.length > 0) {
    list = items.sort(sortItems).map((el) => (
      <CardButton key={el.id}>
        <JournalItem title={el.title} text={el.text} date={el.date} />
      </CardButton>
    ));
  }

  return <div className="journal-list">{list}</div>;
};
