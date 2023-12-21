import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();
	const [uid, setUid] = useState("");
	const [error, setError] = useState(0);

	function save() {
		if (uid.length != 12) return setError(1);
        setError(2)
		localStorage.setItem("userid", uid);
		router.push("/");
	}

    useEffect(() => {
        const no = localStorage.getItem("userid");
        if(no) router.push('/')
    }, [])
	return (
		<main>
			<div className={styles.container}>
				<h1>Better-Lab</h1>
				<div className={styles.login}>
					<input
						value={uid}
                        maxLength={12}
                        pattern="[0-9]{12}"
                        minLength={12}
                        style={error == 1 ? {border: "1px solid var(--red)", background: "#D133330e"} : error == 2 ?  {border: "1px solid var(--green)", background: "#65d1330e"} : {border: "1px solid transparent"}}
						onChange={(e) => {
							setError(0);
							setUid(e.target.value);
						}}
						placeholder="User ID"
					/>
					<button onClick={save}>Login</button>
				</div>
			</div>
		</main>
	);
}
