import "./ActionButton.css";

type Props = {
  onClick: () => void;
  label: string;
};

/**
 * General button component
 */
export default function ActionButton({
  onClick,
  label,
}: Readonly<Props>) {
  return (
    <button onClick={onClick} className="SignOutButton fade-in-fwd">
      {label}
    </button>
  );
}
