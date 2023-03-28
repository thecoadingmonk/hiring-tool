import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import type { FC, ReactElement } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import { ModalProps } from "../types/Modal";

const Portal: FC<{ children: ReactElement }> = ({
  children,
}: {
  children: ReactElement;
}) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    const element = el.current;

    modalRoot?.appendChild(element);

    return () => {
      modalRoot?.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
};

const Modal: FC<ModalProps> = ({
  children,
  show,
  onClose,
  className,
}: ModalProps) => {
  return (
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      appear
    >
      <Portal>
        <div
          className="modal fixed top-0 bottom-0 right-0 left-0 bg-gray-10/50 flex items-center justify-center transition ease-in-out duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
        >
          <div
            className={`modal-content bg-white p-8 rounded-[10px] border border-gray-20 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
