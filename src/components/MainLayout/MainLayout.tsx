import cls from "./MainLayout.module.css";
import { GitHubLogo } from "../GitHubLogo/GitHubLogo";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { memo } from "react";
import { ToastContainer } from "react-toastify";

export const MainLayout = memo(() => {
  const currentYear: number = new Date().getFullYear();

  return (
    <>
    <div className={cls.mainLayout}>
      <Header />
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          © Almakaev Andrey | {currentYear} <GitHubLogo />
        </footer>
      </div>
    </div>

    <ToastContainer/>
    </>
  );
});
