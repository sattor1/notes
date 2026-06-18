import { useContext, useEffect, useReducer, useRef } from 'react';
import { Button } from '../Button/Button.jsx';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';
import { Input } from '../Input/Input.jsx';
import { UserContext } from '../../context/user.context';
import Logo from '../Logo/Logo.jsx';

export const JournalForm = ({ editItem, onSubmit, deleteItem }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (editItem) {
      dispatchForm({
        type: 'SET_VALUE',
        payload: { ...editItem },
      });
    } else {
      dispatchForm({ type: 'CLEAR' });
    }
  }, [editItem]);

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
      onSubmit({ ...values, userId });
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, userId, onSubmit]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

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

  const deleteJournalItem = () => {
    deleteItem({ ...values, userId });
    dispatchForm({ type: 'CLEAR' });
  };

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['form-label']}>
        <Input
          type="title"
          name="title"
          appearence="title"
          isValid={isValid.title}
          ref={titleRef}
          value={values.title}
          onChange={onChange}
        />

        {editItem && (
          <Logo
            image="/archive.svg"
            className={styles.delete}
            onClick={deleteJournalItem}
          />
        )}
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          id="date"
          type="date"
          name="date"
          isValid={isValid.date}
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
          onChange={onChange}
        />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          id="tag"
          name="tag"
          value={values.tag}
          onChange={onChange}
        />
      </div>

      <textarea
        name="post"
        cols="30"
        rows="10"
        ref={textRef}
        className={cn(styles.input, {
          [styles.invalid]: !isValid.post,
        })}
        value={values.post}
        onChange={onChange}
      ></textarea>

      <Button>Сохранить</Button>
    </form>
  );
};
