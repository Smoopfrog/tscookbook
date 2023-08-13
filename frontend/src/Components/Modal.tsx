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
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
