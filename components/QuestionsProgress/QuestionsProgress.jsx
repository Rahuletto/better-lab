import { useSelectedLayoutSegments } from 'next/navigation';
import styles from './QuestionProgress.module.css';
const QuestionsProgress = (props) => {
  console.log(props.courseData && props.courseData?.flare.children[0].children);
  return (
    <>
      <h1> {props.courseData && props.courseData.flare.children[0].name}</h1>
      <div className="row d-flex justify-content-around">
        <div className="col-3">Level 1</div>
        <div className="col-9 d-flex justify-content-around">
          {props.course &&
            props.courseData?.flare.children[0].children.map((_el, index) => {
              return (
                <div key={index} className={styles.square}>
                  e
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default QuestionsProgress;
