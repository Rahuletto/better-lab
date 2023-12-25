import styles from '@/styles/Question.module.css';
import { CompilerResponse } from '@/types';

export default function Output({
  compileData,
}: {
  compileData: CompilerResponse| null;
}) {
  return (
    <div id="result">
      {compileData && (
        <div
          className={styles.result}
          style={
            compileData.result.evalPercentage == '100.0'
              ? { borderColor: 'var(--green)' }
              : compileData.result.errorMsg
              ? { borderColor: 'var(--red)' }
              : {}
          }>
          <h2
            style={
              compileData.result.statusCode != '200'
                ? { color: 'var(--red)' }
                : { color: 'var(--green)' }
            }>
            {compileData.result.evalPercentage}%
          </h2>
          {compileData.result.errorMsg ? (
            <pre className={styles.error}>{compileData.result.errorMsg}</pre>
          ) : (
            <div className={styles.resVar}>
              {compileData.result.statusArray.map((el, ind) => {
                return (
                  <div className={el.color} key={ind}>
                    <p>{el.msg}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
