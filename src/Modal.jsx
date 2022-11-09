import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) =>  {
  const elRef = useRef(null);

  if (!elRef.current) {
    // if I don't have the element then create one
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    // cleanup the modal root when we unmount the modal
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{ children }</div>, elRef.current);
}

export default Modal;
