import { useState, useEffect } from "react";
import { data } from "../jsondata/Data";

const Home = () => {
  const [dataList, setDataList] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    const filteredItems = dataList?.filter((item) =>
      item.course.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDataList(filteredItems);
  }, [dataList, searchText]);

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
      <button onClick={handleDelete}>Delete All</button>
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
            <th>
              Course{" "}
              <span className="filter" onClick={() => filterOrder("asc")}>
                Asc
              </span>{" "}
              <span className="filter" onClick={() => filterOrder("desc")}>
                Desc
              </span>
            </th>
            <th>Duration</th>
            <th>Fees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDataList.map((item, index) => {
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
                  <button onClick={() => singleDelete(index)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
