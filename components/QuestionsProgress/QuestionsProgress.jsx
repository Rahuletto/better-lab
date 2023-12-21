import { useState } from "react";
import styles from "./QuestionProgress.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
const QuestionsProgress = ({ courseData, setNum, num }) => {
	const [index, setIndex] = useState(0);
	function handleOnClick(e) {
		if (e == "next" && index < courseData.flare.children.length - 1) {
			setIndex(index + 1);
		} else if (index > 0) {
			setIndex(index - 1);
		}
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
							courseData?.flare.children[index].children.map((el, i) => {
								return (
									<>
										<div
											title={"Question " + el.name}
											key={i}
											onClick={() => {
												setNum(Number(el.name));
											}}
											className={[
												el.status == 2
													? styles.greenSquare
													: el.status == 1
													  ? styles.yellowSquare
													  : styles.redSquare,
												num == Number(el.name) ? styles.active : "",
											].join(" ")}
										></div>
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
							courseData?.flare.children[index].children.map((el, i) => {
								return (
									<>
										<div
											title={"Question " + el.children[0].name}
											key={i}
											onClick={() => {
												setNum(Number(el.children[0].name));
											}}
											className={[
												el.children[0].status == 2
													? styles.greenSquare
													: el.children[0].status == 1
													  ? styles.yellowSquare
													  : styles.redSquare,
												num == Number(el.children[0].name) ? styles.active : "",
											].join(" ")}
										></div>
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
							courseData?.flare.children[index].children.map((el, i) => {
								return (
									<>
										<div
											title={"Question " + el.children[0].children[0].name}
											key={i}
											onClick={() => {
												setNum(Number(el.children[0].children[0].name));
											}}
											className={[
												el.children[0].children[0].status == 2
													? styles.greenSquare
													: el.children[0].children[0].status == 1
													  ? styles.yellowSquare
													  : styles.redSquare,
												num == Number(el.children[0].children[0].name) ? styles.active : "",
											].join(" ")}
										></div>
									</>
								);
							})}
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-between align-items-center">
				<button
					type="button"
					onClick={() => handleOnClick("previous")}
					className={styles.pagination}
					disabled={index <= 0}
				>
					<FaAngleLeft />
				</button>
				<p style={{ margin: 0, color: "var(--color)" }}>
					{index + 1}/{courseData.flare.children.length}
				</p>
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
