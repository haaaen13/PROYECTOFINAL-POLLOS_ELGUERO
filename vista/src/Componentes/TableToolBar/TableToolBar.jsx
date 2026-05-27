import React from "react";
import { Search, Plus } from "lucide-react";

const TableToolbar = ({
  title,
  searchPlaceholder = "Search...",
  buttonText = "Add New",
  onSearch,
  onAdd,
  showButton = true,
}) => {
  return (
    <div className="table-toolbar">
      <div className="toolbar-left">
        <h2>{title}</h2>
      </div>

      <div className="toolbar-right">
        <div className="search-box">
          <Search size={16} />

          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {showButton && (
          <button className="add-btn" onClick={onAdd}>
            <Plus size={16} />
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default TableToolbar;
