import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.navLink}>
            Home
          </NavLink>
          <NavLink to="/movies" className={css.navLink}>
            Movies
          </NavLink>
        </nav>
      </header>
      <Suspense fallback={'LOADING PAGE...'}>
        <main className={css.main}>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
