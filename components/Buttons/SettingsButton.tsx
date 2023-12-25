import { CSSProperties } from 'react';
import { FaGear } from 'react-icons/fa6';

export default function SettingsButton({
  style,
  className,
}: {
  style: CSSProperties;
  className: string;
}) {
  return (
    <button
      className={className}
      type="button"
      style={style}
      onClick={() =>
        (document.getElementById('settings') as HTMLDialogElement).showModal()
      }
      title="Settings">
      <FaGear />
    </button>
  );
}
