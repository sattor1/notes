import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import styles from './SelectUser.module.css';

export const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select
      name="user"
      id="user"
      value={userId}
      className={styles.select}
      onChange={changeUser}
    >
      <option value="1">Саттор</option>
      <option value="2">Петр</option>
    </select>
  );
};
