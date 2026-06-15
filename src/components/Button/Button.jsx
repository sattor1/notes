import './Button.css';

export const Button = ({ children, onClick }) => {
  return (
    <button className="button accent" onClick={onClick}>
      {children}
    </button>
  );
};
