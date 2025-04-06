import './Button.css';

export const Button = ({ onClick }) => {
  return (
    <button className="button accent" onClick={onClick}>
      Сохранить
    </button>
  );
};
