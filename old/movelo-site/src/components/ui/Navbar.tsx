import Link from 'next/link';
import styles from "@/styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <ul className={styles.navbar}>
      <li className={styles.spacer2}></li>
      <li>
        <Link href="/">
            <img src="movelo-logo.svg" alt="Movelo Logo" />
        </Link>
      </li>
      <li className={styles.spacer}></li>
      <li>
        <Link href="/roadmap">
          <button>Roadmap</button>
        </Link>
      </li>
      <li>
        <Link href="/team">
          <button>The Team</button>
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <button>Contact Us</button>
        </Link>
      </li>
      <li className={styles.spacer2}></li>
    </ul>
  );
};

export default Navbar;