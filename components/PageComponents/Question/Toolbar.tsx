import styles from '@/components/Elements/Buttons/Buttons.module.css';
import { MouseEventHandler } from 'react';

import { FaGear, FaHouse } from 'react-icons/fa6';
import { TbProgressBolt } from 'react-icons/tb';

export default function Toolbar({
  handleProgress,
  onHome,
}: {
  handleProgress: MouseEventHandler<HTMLButtonElement>;
  onHome: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div
      className="row d-flex justify-content-between mb-2"
      style={{ position: 'sticky', bottom: '14px', zIndex: 3 }}>
      <div className="d-flex g-6 justify-content-end" style={{ gap: 8 }}>
        <button
          className={styles.closebutton}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            borderWidth: 1.8,
            padding: '8px 12px',
            fontSize: 18,
          }}
          onClick={onHome}
          title="Home">
          <FaHouse />
        </button>

        <button
          className={styles.closebutton}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            borderWidth: 1.8,
            padding: '8px 12px',
            fontSize: 18,
          }}
          onClick={() =>
            (
              document.getElementById('settings') as HTMLDialogElement
            ).showModal()
          }
          title="Settings">
          <FaGear />
        </button>
        <button
          className={styles.closebutton}
          style={{
            display: 'flex',
            alignItems: 'center',
            borderWidth: 1.8,
            padding: '6px 10px',
            fontSize: 22,
          }}
          onClick={handleProgress}
          title="Progress (Select Question)">
          <TbProgressBolt />
        </button>
      </div>
    </div>
  );
}
