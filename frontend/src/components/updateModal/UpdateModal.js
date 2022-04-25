import React from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

//don't worry its just a package for modal. just go and explore https://www.npmjs.com/package/react-modal

export default function UpdateModal({ id, isReload, setIsReload }) {
  // PUT Method 🐼
  const handleUpdate = (e) => {
    e.preventDefault();
    const userName = e.target.userName.value;
    const textData = e.target.textData.value;
    // clear input
    e.target.userName.value = "";
    e.target.textData.value = "";

    fetch(`http://localhost:5000/note/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, textData }),
      /* body:JSON.stringify({
        "userName": userName,
        "textData": textData
      }) */
    }).then((res) => res.json());
    // .then((data) => console.log(data));
    setIsReload(!isReload);
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className="color-801336 btn-sm btn">
        {" "}
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="btn btn-sm btn-warning">
          close
        </button>
        <div>Please insert your text</div>
        <div className=" p-3 color-4D4C7D">
          <form className="container " onSubmit={handleUpdate}>
            <div className="input-group mb-3 mt-5">
              <input
                type="text"
                name="userName"
                className="form-control"
                placeholder="Your name"
                aria-label="Username"
              />
            </div>

            <div className="input-group">
              <textarea
                name="textData"
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="mt-4">
              <input type="submit" value="submit" className="btn btn-info" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
