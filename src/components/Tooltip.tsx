import "./Tooltip.css";

interface TooltipProps {
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text }) => {
  return (
    <span className="tooltip-wrapper">
      <svg
        className="warning-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
        width="18"
        height="18"
      >
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 12a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 1 0v3.5A.5.5 0 0 1 8 12zm0-6a.75.75 0 1 1 0-1.5A.75.75 0 0 1 8 6z" />
      </svg>
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default Tooltip;
