import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideEditModal } from "../modalSlice";
import { editVideo } from "../utilities";
import { removeEditItem } from "../videoSlice";

import { motion } from "framer-motion";

const CardEditModal = () => {
  const [text, setText] = useState("");

  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const I_D_S = useSelector((store) => store?.videos?.editItems);

  const id = I_D_S[0];

  const bucketId = I_D_S[1];

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const update = () => {
    let statementExecuted = false;

    setTimeout(function () {
      if (!statementExecuted) {
        dispatch(hideEditModal());
        statementExecuted = true;
      }
    }, 600);
  };

  return (
    <motion.div
      initial={{ y: "50%", opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className="Card-modal bg-gray-50 w-2/3 sm:w-1/3 h-1/3 border-[1px] absolute top-[200px] left-[100px] sm:left-[400px] sm:p-4 flex flex-col justify-evenly rounded-xl px-3 "
    >
      <div className="w-11/12 flex justify-center">
        <p className="text-[25px] font-[400]">Edit Video</p>
      </div>
      <input
        ref={inputRef}
        value={text}
        placeholder="Edit Name.."
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        className="sm:w-11/12 sm:py-2 border-[1px] px-2 rounded-md"
      />
      <input
        value={url}
        placeholder="Edit URL..."
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        type="text"
        className="sm:w-11/12 sm:py-2 border-[1px] px-2 rounded-md"
      />
      <button
        className="w-11/12 py-1 border-[1px] bg-[#80669d]  text-white rounded-md"
        onClick={() => {
          if (text === "" || url === "") {
            alert("please fill the details");
          } else {
            editVideo(id, text, url, bucketId);
            dispatch(removeEditItem());
            update();
          }
        }}
      >
        Done
      </button>
      <button
        onClick={() => {
          dispatch(removeEditItem());
          update();
        }}
        className="w-11/12 py-1 border-[1px] bg-white text-black rounded-md  hover:bg-[#ffbd03]"
      >
        Cancel
      </button>
    </motion.div>
  );
};

export default CardEditModal;
