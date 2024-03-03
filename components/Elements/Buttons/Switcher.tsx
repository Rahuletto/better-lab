import styles from '@/components/Elements/Buttons/Buttons.module.css';
import { MouseEventHandler } from 'react';

import { FaBackward, FaForward } from 'react-icons/fa6';

export default function Switcher({
  changeQuestion,
  num,
}: {
  changeQuestion: any;
  num: number | undefined;
}) {
  return (
    <div
      className="row d-flex justify-content-between mb-2"
      style={{ position: 'sticky', bottom: '14px', zIndex: 3 }}>
      <div className="d-flex g-6 justify-content-end" style={{ gap: 8 }}>
        <button
          className={styles.closebutton}
          style={{
            display: 'flex',
            alignItems: 'center',
            borderWidth: 1.8,
            padding: '6px 10px',
            fontSize: 22,
          }}
          title="Previous Question"
          onClick={() => num && changeQuestion(num - 1)}>
          <FaBackward />
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
          title="Next Question"
          onClick={() => num && changeQuestion(num + 1)}>
          <FaForward />
        </button>
      </div>
    </div>
  );
}
