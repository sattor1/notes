import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import './JournalForm.css';

export const JournalForm = () => {
  const [inputData, setInputData] = useState('');

  const inputChange = (event) => {
    setInputData(event.target.value);
  };

  return (
    <form className="journal-form">
      <input type="date" />
      <input type="text" value={inputData} onChange={inputChange} />
      <textarea></textarea>

      <Button></Button>
    </form>
  );
};
