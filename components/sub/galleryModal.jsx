import React from "react";
import { closeModal } from "../../../redux/reducer/modalSlice";
import { useDispatch } from "react-redux";

function Modal({ videoUrl }) {
    const dispatch = useDispatch();
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-black bg-opacity-70" onClick={() => dispatch(closeModal())}>
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={videoUrl}
                        title="YouTube video player"
                        style={{ border: "none" }}
                        allow="accelerometer; clipboard-write; gyroscope; picture-in-picture"
                        allowFullScreen={true}
                        autoPlay={true}
                    ></iframe>
                </div>
            </div>
        </>
    );
}

export default Modal;
