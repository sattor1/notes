import Logo from '../Logo/Logo';
import { SelectUser } from '../SelectUser/SelectUser';
import { Button } from '../Button/Button.jsx';
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <Logo image="/logo.svg" className={styles.logo} />
      <SelectUser />
    </>
  );
}
