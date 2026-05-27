// components/Pagination/Pagination.jsx

import { ChevronLeft, ChevronRight } from "lucide-react";

import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange, onNext, onPrev }) {
  return (
    <div className="pagination">
      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={onPrev}
      >
        <ChevronLeft size={16} />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-number ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
