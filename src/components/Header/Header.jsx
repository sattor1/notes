import Logo from '../Logo/Logo';
import { SelectUser } from '../SelectUser/SelectUser';
// import SelectUser from '../SelectUser/SelectUser';
import { Button } from '../Button/Button.jsx';
import { useState } from 'react';

const logos = ['/logo.svg', '/vite.svg'];

export function Header() {
  const [logoIndex, setLogoIndex] = useState(0);

  const toggleLogo = () => {
    setLogoIndex((state) => Number(!state));
  };
  return (
    <>
      <Logo image={logos[logoIndex]} />

      <SelectUser />
      <Button onClick={toggleLogo}>Сменить лого</Button>
    </>
  );
}
