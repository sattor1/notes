import { SelectUser } from '../SelectUser/SelectUser';
import styles from './Header.module.css';
// import SelectUser from '../SelectUser/SelectUser';
// import Logo from '../Logo/Logo';

// const logos = ['/logo.svg', '/vite.svg'];

export function Header() {
  return (
    <>
      {/* <Logo image={logos[0]} /> */}
      <img className={styles.logo} src="./logo.svg" alt="Логотип журнала" />
      <SelectUser />
    </>
  );
}
