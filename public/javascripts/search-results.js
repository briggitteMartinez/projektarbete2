function sortTable(columnIndex, tableClass) {
    const table = document.querySelector(`.${tableClass}`);
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
  
    // Check if the column is numeric or text
    const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText.trim());
  
    // Toggle sort order (ascending/descending)
    let sortOrder = table.dataset.sortOrder === "asc" ? "desc" : "asc";
    table.dataset.sortOrder = sortOrder;
  
    // Sort rows
    rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].innerText.trim();
      const cellB = rowB.cells[columnIndex].innerText.trim();
  
      if (isNumeric) {
        return sortOrder === "asc"
          ? parseFloat(cellA) - parseFloat(cellB)
          : parseFloat(cellB) - parseFloat(cellA);
      } else {
        return sortOrder === "asc"
          ? cellA.localeCompare(cellB)
          : cellB.localeCompare(cellA);
      }
    });
  
    // Append sorted rows back to the table body
    rows.forEach((row) => tbody.appendChild(row));
  
    // Update header arrows
    updateSortArrows(columnIndex, sortOrder);
  }
  
  function updateSortArrows(columnIndex, sortOrder) {
    // Clear all arrows
    document.querySelectorAll("thead th span").forEach((arrow) => {
      arrow.innerHTML = "";
    });
  
    // Add the arrow for the current column
    const arrow = document.getElementById(`arrow-${columnIndex}`);
    if (arrow) {
      arrow.innerHTML =
        sortOrder === "asc"
          ? '<span class="text-gray-600">▲</span>'
          : '<span class="text-gray-600">▼</span>';
    }
  }
  