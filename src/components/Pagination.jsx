/*
  🧠 Pagination component

  This component handles:
  - next page button
  - previous page button
  - page number display
*/

function Pagination({
  currentPage,
  setCurrentPage,
  pokemons,
  itemsPerPage,
}) {

  // 🧮 Calculate total pages
  const totalPages = Math.ceil(
    pokemons.length / itemsPerPage
  );

  return (

    // 📄 Pagination controls container
    <div className="pagination">

      {/* ⬅ Previous page button */}
{/* ⬅ Previous page button */}
<button
  className="pagination-btn"
  onClick={() =>
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    )
  }
>
  ⬅ Prev
</button>

{/* 📊 Current page display */}
<span className="pagination-text">
  Page {currentPage} of {totalPages}
</span>

{/* ➡ Next page button */}
<button
  className="pagination-btn"
  onClick={() =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages)
    )
  }
>
  Next ➡
</button>

    </div>
  );
}

export default Pagination;