import "../Styles/Modal.css";

interface ModalProps {
  handleClose(event: React.MouseEvent<HTMLButtonElement>): void;
  show: boolean;
  children: React.ReactNode;
}

const Modal = ({ handleClose, show, children }: ModalProps) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        {children}
      </div>
    </div>
  );
};

export default Modal;
