import { CSSProperties } from 'react';
import { FaGear } from 'react-icons/fa6';

import styles from './Buttons.module.css'

export default function SettingsButton({
  style,
}: {
  style: CSSProperties;
}) {
  return (
    <button
      className={styles.closebutton}
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
