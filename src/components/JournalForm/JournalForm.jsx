import { useEffect, useReducer } from 'react';
import { Button } from '../Button/Button.jsx';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';

export const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  console.log('here', formState);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;

    if (!isValid.title || !isValid.text || !isValid.date) {
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'RESET_VALUES' });
    }
  }, [isFormReadyToSubmit]);

  const onChange = (event) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [event.target.name]: event.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type="title"
          name="title"
          className={cn(styles.input, {
            [styles.invalid]: !isValid.title,
          })}
          value={values.title}
          onChange={onChange}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          id="date"
          type="date"
          name="date"
          className={cn(styles.input, {
            [styles.invalid]: !isValid.date,
          })}
          value={values.date}
          onChange={onChange}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          className={styles.input}
          value={values.tag}
          onChange={onChange}
        />
      </div>

      <textarea
        name="text"
        cols="30"
        rows="10"
        className={cn(styles.input, {
          [styles.invalid]: !isValid.text,
        })}
        value={values.text}
        onChange={onChange}
      ></textarea>

      <Button />
    </form>
  );
};
