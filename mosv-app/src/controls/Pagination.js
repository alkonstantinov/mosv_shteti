import React from "react";

const Pagination = ({ totalRecs, indexes, pageSize }) => {
    const [startIndex, setStartIndex] = indexes;
    const totalPages = Math.ceil(totalRecs / pageSize);
    const currentPage = startIndex <= pageSize ? 1 : Math.ceil(startIndex / pageSize);
    const showPages = 6;

    const from = Math.max(1, currentPage - parseInt(showPages / 2));
    const to = Math.min(totalPages, from + showPages);
    const parr = [];
    for (let i = from; i <= to; i++) {
        parr.push(i);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <div className="page-link" onClick={() => setStartIndex((currentPage - 1) * pageSize)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </div>
                </li>
                {parr.map((item, index) => (
                    <li className={`page-item ${item === currentPage ? "active" : ""}`} key={index}>
                        <div className="page-link" onClick={() => setStartIndex((item - 1) * pageSize + 1)}>
                            {item}
                        </div>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <div className="page-link" onClick={() => setStartIndex(currentPage * pageSize + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
