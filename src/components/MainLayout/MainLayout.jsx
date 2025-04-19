import cls from "./MainLayout.module.css";
import { GitHubLogo } from "../GitHubLogo/GitHubLogo";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cls.mainLayout}>
      <header>header</header>
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          © Almakaev Andrey | {currentYear} <GitHubLogo />
        </footer>
      </div>
    </div>
  );
};
