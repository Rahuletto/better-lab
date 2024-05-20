import styles from '@/styles/Question.module.css';
import { QuestionData } from '@/types';

export default function InputCase({
  output,
  error,
}: {
  output: string;
  error: boolean;
}) {
  return (
    <div id={error ? "errorOutput" : ""} className={styles.sideContainer} style={error ? { gap: 4, justifyContent: 'flex-start', paddingBottom: 14, borderColor: 'var(--red)' } : {gap: 4, justifyContent: 'flex-start', paddingBottom: 14}} >
        <h3>Output</h3>
        {output && <code>{output}</code>}
    </div>
  );
}
