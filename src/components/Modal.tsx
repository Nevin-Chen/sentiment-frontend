interface ModalProps {
  open: number,
  high: number,
  low: number,
  close: number
}

const Modal = ({open, high, low, close}: ModalProps) => {
  return (
    <>
      <div>
        Open: ${open}<br/>
        High: ${high}<br/>
        Low: ${low}<br/>
        Close: ${close}
      </div>
    </>
  )
}

export default Modal
