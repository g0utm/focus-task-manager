function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-container">
      <button
        className={filter === "All" ? "filter-active" : ""}
        onClick={() => setFilter("All")}>
        All
      </button>
      <button 
        className={filter === "Active" ? "filter-active" : ""}
        onClick={() => setFilter("Active")}>
        Active
      </button>
      <button 
         className={filter === "Completed" ? "filter-active" : ""}
        onClick={() => setFilter("Completed")}>
        Completed
      </button>
    </div>
  );
}

export default FilterBar;