import styles from '@/styles/Question.module.css';
import { QuestionData } from '@/types';

export default function InputCase({
  input,
  setInput,
  qData,
}: {
  input: string;
  setInput: any;
  qData: QuestionData | null;
}) {
  return (
    <div className={styles.sideContainer} style={{gap: 4, justifyContent: 'flex-start', paddingBottom: 14, height: "50%"}}>

        <h3>Input</h3>
        {qData && (
          <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        )}

    </div>
  );
}
