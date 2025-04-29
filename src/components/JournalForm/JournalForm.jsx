import { useEffect, useReducer, useRef } from 'react';
import { Button } from '../Button/Button.jsx';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';

export const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;

    if (!isValid.title || !isValid.text || !isValid.date) {
      focusError(isValid);
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
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (event) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [event.target.name]: event.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <input
          type="title"
          name="title"
          ref={titleRef}
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
          ref={dateRef}
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
        ref={textRef}
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
