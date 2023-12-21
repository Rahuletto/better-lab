import { useState } from 'react';
import styles from './QuestionProgress.module.css';
const QuestionsProgress = ({ courseData }) => {
  console.log(courseData && courseData?.flare.children[0].children);
  const [index, setIndex] = useState(0);
  function handleOnClick(e) {
    if (e == 'next' && index < 9) {
      setIndex(index + 1);
    } else if (index > 0) {
      setIndex(index - 1);
    }
  }

  return (
    <>
      <h1> {courseData && courseData.flare.children[index].name}</h1>
      <div className="row d-flex justify-content-around">
        <div className="col-3">
          <p className={styles.levelTitle}> Level 1</p>
        </div>
        <div className="col-9 d-flex justify-content-around">
          {courseData &&
            courseData?.flare.children[index].children.map((el, index) => {
              return (
                <>
                  {el.status == 2 && (
                    <div key={index} className={styles.greenSquare}></div>
                  )}
                  {el.status == 1 && (
                    <div key={index} className={styles.yellowSquare}></div>
                  )}
                  {el.status == 0 && (
                    <div key={index} className={styles.redSquare}></div>
                  )}
                </>
              );
            })}
        </div>
      </div>
      <div className="row d-flex justify-content-around">
        <div className="col-3">
          <p className={styles.levelTitle}> Level 2</p>
        </div>
        <div className="col-9 d-flex justify-content-around">
          {courseData &&
            courseData?.flare.children[0].children.map((el, index) => {
              return (
                <>
                  {el.children[0].status == 2 && (
                    <div key={index} className={styles.greenSquare}></div>
                  )}
                  {el.children[0].status == 1 && (
                    <div key={index} className={styles.yellowSquare}></div>
                  )}
                  {el.children[0].status == 0 && (
                    <div key={index} className={styles.redSquare}></div>
                  )}
                </>
              );
            })}
        </div>
      </div>
      <div className="row d-flex justify-content-around">
        <div className="col-3">
          <p className={styles.levelTitle}> Level 3</p>
        </div>
        <div className="col-9 d-flex justify-content-around">
          {courseData &&
            courseData?.flare.children[0].children.map((el, index) => {
              return (
                <>
                  {el.children[0].children[0].status == 2 && (
                    <div key={index} className={styles.greenSquare}></div>
                  )}
                  {el.children[0].children[0].status == 1 && (
                    <div key={index} className={styles.yellowSquare}></div>
                  )}
                  {el.children[0].children[0].status == 0 && (
                    <div key={index} className={styles.redSquare}></div>
                  )}
                </>
              );
            })}
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button
            type="button"
            onClick={() => handleOnClick('previous')}
            className={styles.pagination}
          >
            Previous
          </button>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button
            type="button"
            onClick={() => handleOnClick('next')}
            className={styles.pagination}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default QuestionsProgress;
