import { useState } from "react";
import styles from "./QuestionProgress.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const QuestionsProgress = ({ courseData, setData, user }) => {
	const [index, setIndex] = useState(0);
	function handleOnClick(e) {
		if (e == "next" && index < courseData.flare.children.length - 1) {
			setIndex(index + 1);
		} else if (index > 0) {
			setIndex(index - 1);
		}
	}

	async function getQuestion() {
		fetch("/api/question?id=" + num + "&user=" + user)
			.then((d) => d.json())
			.then((a) => {
				setData(a);
			});
		return true;
	}

	return (
		<>
			<h1
				style={{ fontSize: 24, textTransform: "capitalize", marginBottom: 18 }}
			>
				{" "}
				{courseData && courseData.flare.children[index].name.toLowerCase()}
			</h1>
			<div className={styles.grid}>
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-3" style={{ width: 64 }}>
						<p className={styles.levelTitle}> L1</p>
					</div>
					<div className="col-9 d-flex" style={{ gap: 4 }}>
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
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-3" style={{ width: 64 }}>
						<p className={styles.levelTitle}> L2</p>
					</div>
					<div className="col-9 d-flex" style={{ gap: 4 }}>
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
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-3" style={{ width: 64 }}>
						<p className={styles.levelTitle}> L3</p>
					</div>
					<div className="col-9 d-flex" style={{ gap: 4 }}>
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
			</div>
			<div className="d-flex justify-content-between">
				<button
					type="button"
					onClick={() => handleOnClick("previous")}
					className={styles.pagination}
					disabled={index <= 0}
				>
					<FaAngleLeft />
				</button>
				<button
					type="button"
					onClick={() => handleOnClick("next")}
					className={styles.pagination}
					disabled={index >= courseData.flare.children.length - 1}
				>
					<FaAngleRight />
				</button>
			</div>
		</>
	);
};

export default QuestionsProgress;
