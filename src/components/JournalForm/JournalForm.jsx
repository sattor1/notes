import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import styles from './JournalForm.module.css';
import cn from 'classnames';

export const JournalForm = ({ onSubmit }) => {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    for (let key in formValidState) {
      if (!formProps[key]?.length) {
        setFormValidState((state) => ({ ...state, [key]: false }));
        isFormValid = false;
      } else {
        setFormValidState((state) => ({ ...state, [key]: true }));
      }
    }

    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <input
        type="title"
        name="title"
        className={cn(styles.input, {
          [styles.invalid]: !formValidState.title,
        })}
      />
      <input
        type="date"
        name="date"
        className={cn(styles.input, {
          [styles.invalid]: !formValidState.date,
        })}
      />
      <input type="text" name="tag" className={styles.input} />
      <textarea
        name="text"
        cols="30"
        rows="10"
        className={cn(styles.input, {
          [styles.invalid]: !formValidState.text,
        })}
      ></textarea>

      <Button />
    </form>
  );
};
