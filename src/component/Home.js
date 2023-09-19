import { useState, useEffect } from "react";
import { data } from "../jsondata/Data";

const Home = () => {
  const [dataList, setDataList] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const filteredItems = dataList?.filter(
      (item) =>
        item.course.toLowerCase().includes(searchText.toLowerCase()) ||
        item.fees.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDataList(filteredItems);
  }, [dataList, searchText]);

  const totalpages = Math.ceil(filteredDataList.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDataList.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredDataList.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (e, item) => {
    const { checked } = e.target;
    item.checked = checked;
    setSelectedItems((prevSelectedItems) =>
      checked
        ? [...prevSelectedItems, item]
        : prevSelectedItems.filter((i) => i !== item)
    );
  };

  const handleDelete = () => {
    const updatedDataList = dataList.filter(
      (item) => !selectedItems.includes(item)
    );
    setDataList(updatedDataList);
    setSelectedItems([]);
  };

  const checkedAll = (e) => {
    const { checked } = e.target;
    const updatedDataList = dataList.map((item) => ({
      ...item,
      checked: checked,
    }));
    setDataList(updatedDataList);
    setSelectedItems(checked ? updatedDataList : []);
  };

  const singleDelete = (id) => {
    const updatedDataList = [...dataList];
    updatedDataList.splice(id, 1);
    setDataList(updatedDataList);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filterOrder = (order) => {
    const sortedData = [...filteredDataList].sort((a, b) => {
      const courseA = a.course.toLowerCase();
      const courseB = b.course.toLowerCase();
      switch (order) {
        case "asc":
          if (courseA < courseB) {
            return -1;
          }
          if (courseA > courseB) {
            return 1;
          }
          return 0;
        case "desc":
          if (courseA > courseB) {
            return -1;
          }
          if (courseA < courseB) {
            return 1;
          }
          return 0;
        default:
          return 0;
      }
    });
    setFilteredDataList(sortedData);
    setCurrentPage(1); 
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalpages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <h1>Home Component</h1>
      <div>
        <input
          type="text"
          placeholder="search here..."
          onChange={handleSearch}
        />
      </div>
      <button onClick={handleDelete}>Delete Selected All</button>
      <button className="filter" onClick={() => filterOrder("asc")}>
        Asc
      </button>{" "}
      <button className="filter" onClick={() => filterOrder("desc")}>
        Desc
      </button>
      <table border="1" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => checkedAll(e)}
                checked={dataList.every((item) => item.checked)}
              />
            </th>
            <th>#</th>
            <th>Course</th>
            <th>Duration</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords?.length > 0 ? (
            <>
              {currentRecords?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(e, item)}
                        checked={item.checked || false}
                      />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.course}</td>
                    <td>{item.duration}</td>
                    <td>{item.fees}</td>
                    <td>
                      <button onClick={() => singleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={6}>Data Not Found</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="pagination">
      <button onClick={prevPage}>Previous Page</button>
      <div className="button_group">{renderPaginationButtons()}</div>
      <button onClick={nextPage}>Next Page</button>
      </div>
    </>
  );
};

export default Home;
