import { useEffect } from "react";
import "../../Styles/Modal.css";

interface ModalProps {
  handleClose(): void;
  show: boolean;
  children: React.ReactNode;
}

const Modal = ({ handleClose, show, children }: ModalProps) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  useEffect(() => {
    document.getElementById("modal-parent")!.onclick = (e) => {
      const child = document.getElementById("modal-child");

      if (child && !child.contains(e.target as Element)) {
        handleClose();
      }
    };
  }, [handleClose]);

  return (
    <div id="modal-parent" className={showHideClassName}>
      <div id="modal-child" className="modal-main">
        {children}
      </div>
    </div>
  );
};

export default Modal;
