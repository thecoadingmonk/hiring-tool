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
      timeout={200}
      classNames={{
        appear: "transition opacity-0 duration-200 ease-in-out",
        appearActive: "transition opacity-0 duration-200 ease-in-out",
        appearDone: "transition opacity-100 duration-200 ease-in-out",
        enter: "transition opacity-0 duration-200 ease-in-out",
        enterActive: "transition opacity-500 duration-200 ease-in-out",
        enterDone: "transition opacity-100 duration-200 ease-in-out",
        exit: "transition opacity-100 duration-200 ease-in-out",
        exitActive: "transition opacity-50 duration-200 ease-in-out",
        exitDone: "transition opacity-0 duration-200 ease-in-out",
      }}
    >
      <Portal>
        <div
          className="fixed top-0 bottom-0 right-0 left-0 bg-gray-10/50 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
        >
          <div
            className={`bg-white p-8 rounded-[10px] border border-gray-20 transition duration-100 ease-in-out ${
              show ? "opacity-100" : "opacity-0"
            } ${className}`}
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
