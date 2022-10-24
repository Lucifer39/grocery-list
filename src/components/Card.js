import React, { useEffect } from "react";
import { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

const Card = () => {
  const [list, setList] = useState([]);
  const [item, setItem] = useState("");
  const [value, setValue] = useState(false);
  const [edit, setEdit] = useState({});
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(list);

    if (item != "") {
      setList([...list, { id: new Date().getTime().toString(), name: item }]);
      setItem("");
      setValue(true);
      setText("Item saved");
    } else {
      setText("Value is empty");
    }
  };

  useEffect(() => {
    setTimeout(notification, 1000);
  }, [text]);

  const notification = () => {
    setText("");
  };

  const handleDelete = (product) => {
    console.log(product, list);
    const temp = list.filter((thisOne) => product.id != thisOne.id);

    setList(temp);
    setText("Item Deleted");
  };

  const handleEdit = (product) => {
    setItem(product.name);
    setEdit(product);
  };

  const editItem = (e) => {
    e.preventDefault();

    var temp = list.map((product) => {
      if (product.id == edit.id) {
        return { id: product.id, name: item };
      }

      return product;
    });

    setList(temp);
    setItem("");
    setEdit(false);
    setText("Item Edited");
  };

  const handleClear = (e) => {
    e.preventDefault();

    setList([]);
    setText("List is Empty");
    setEdit(false);
    setItem("");
  };

  return (
    <div className="card">
      {text != "" && <article>{text}</article>}
      <h1>Grocery List</h1>
      <form>
        <input
          type="text"
          placeholder="eg. Eggs"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button type="submit" onClick={edit.name ? editItem : handleSubmit}>
          {edit.name ? "Save" : "Submit"}
        </button>
      </form>
      <div className="list">
        {value &&
          list.map((product) => {
            return (
              <div className="items">
                <span className="product-name">{product.name}</span>
                <span className="buttons">
                  <button onClick={() => handleEdit(product)}>
                    <MdOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(product)}>
                    <MdDeleteOutline />
                  </button>
                </span>
              </div>
            );
          })}
      </div>
      <div>
        <button className="clear-items" onClick={handleClear}>
          Clear Items
        </button>
      </div>
    </div>
  );
};

export default Card;
