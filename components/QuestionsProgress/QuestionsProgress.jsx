import styles from './QuestionProgress.module.css';
const QuestionsProgress = ({ courseData }) => {
  console.log(courseData && courseData?.flare.children[0].children);
  return (
    <>
      <h1> {courseData && courseData.flare.children[0].name}</h1>
      <div className="row d-flex justify-content-around">
        <div className="col-3">Level 1</div>
        <div className="col-9 d-flex justify-content-around">
          {courseData &&
            courseData?.flare.children[0].children.map((_el, index) => {
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
