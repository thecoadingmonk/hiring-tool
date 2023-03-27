import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import type { FC, ReactElement } from "react";
import { ModalProps } from "../types/Modal";

const Portal: FC<{ children: ReactElement }> = ({
  children,
}: {
  children: ReactElement;
}) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    modalRoot?.appendChild(el.current);

    return () => {
      modalRoot?.removeChild(el.current);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

const Modal: FC<ModalProps> = ({ children, show }: ModalProps) => {
  return (
    <Portal>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-10/50 flex items-center justify-center transition ease-in-out duration-300">
        <div
          className="bg-white transition ease-in-out duration-300 p-8 rounded-[10px] border border-gray-20"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
