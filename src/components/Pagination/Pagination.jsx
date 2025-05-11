import React from "react";
import cls from "./Pagination.module.css";
import { Button } from "../Button/Button";

export const Pagination = ({ totalPages, currentPage, onPageHandlerChange }) => {
  const maxPages = Math.min(totalPages, 20);

  if (totalPages < 2) return null;

  return (
    <div className={cls.pagination}>
      {Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
        <Button key={page} onClick={() => onPageHandlerChange(page)} isActive={page === currentPage} className={cls.pageButton}>
          {page}
        </Button>
      ))}
    </div>
  );
};
