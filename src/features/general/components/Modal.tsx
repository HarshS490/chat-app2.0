import clsx from "clsx";
import React, { useRef } from "react";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose: () => void;
};

function Modal({ isOpen, children, handleClose }: Props) {
  const containerRef = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLElement,MouseEvent>)=>{
    e.stopPropagation();
    if(containerRef.current && containerRef.current===e.target){
      handleClose();
    }
  }

  return (
    <div
      id="modalid"
      className={clsx("transition-all z-50", {
        "fixed w-screen h-screen bg-black/50  left-0 top-0 opacity-100":
          isOpen,
        "fixed bg-black/50 left-0 top-0 hidden opacity-0": !isOpen,
      })}
    >
      {isOpen && (
        <div
          className="h-full w-full flex flex-col items-center justify-center"
          onClick={handleClick}
          ref={containerRef}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Modal;
