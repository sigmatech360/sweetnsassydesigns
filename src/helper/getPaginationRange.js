// helper to generate pagination with ellipsis
export const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalNumbers = siblingCount * 2 + 5; // e.g. 7 buttons
  if (totalPages <= totalNumbers) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  const range = [];

  if (!showLeftDots && showRightDots) {
    const leftItems = 3 + 2 * siblingCount;
    for (let i = 1; i <= leftItems; i++) {
      range.push(i);
    }
    range.push("...");
    range.push(totalPages);
  } else if (showLeftDots && !showRightDots) {
    range.push(1);
    range.push("...");
    for (
      let i = totalPages - (3 + 2 * siblingCount) + 1;
      i <= totalPages;
      i++
    ) {
      range.push(i);
    }
  } else if (showLeftDots && showRightDots) {
    range.push(1);
    range.push("...");
    for (let i = leftSibling; i <= rightSibling; i++) {
      range.push(i);
    }
    range.push("...");
    range.push(totalPages);
  }

  return range;
};
