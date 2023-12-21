import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
	const router = useRouter();
	const [uid, setUid] = useState("");
	const [pass, setPass] = useState("");

	const [error, setError] = useState(0);

	function save() {
		setError(-1);
		if (uid.length != 12) return setError(1);
		fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				user: uid,
				pass: pass,
			}),
		})
			.then((d) => d.json())
			.then(
				(
					a:
						| { Status: 1; msg: string }
						| { Status: 0; success: boolean; token: string },
				) => {
					if (a.Status == 1){ 
						setError(2);
					localStorage.setItem("userid", uid);
					router.push("/")
				}
					else if(a.Status == 0) {
						localStorage.setItem('token', a.token)
						setError(1)
					}
				},
			);
	}

	useEffect(() => {
		const no = localStorage.getItem("userid");
		if (no) router.push("/");
	}, []);
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1>Better-Lab</h1>
				<div className={styles.login}>
					<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<input
							value={uid}
							maxLength={12}
							pattern="[0-9]{12}"
							minLength={12}
							style={
								error == 1
									? {
											border: "1px solid var(--red)",
											background: "#D133330e",
											borderBottomLeftRadius: 2,
											borderBottomRightRadius: 2,
									  }
									: error == 2
									  ? {
												border: "1px solid var(--green)",
												background: "#65d1330e",
												borderBottomLeftRadius: 2,
												borderBottomRightRadius: 2,
										  }
									  : {
												border: "1px solid transparent",
												borderBottomLeftRadius: 2,
												borderBottomRightRadius: 2,
										  }
							}
							onChange={(e) => {
								setError(0);
								setUid(e.target.value);
							}}
							placeholder="User ID"
						/>
						<input
							type="password"
							value={pass}
							style={
								error == 1
									? {
											border: "1px solid var(--red)",
											background: "#D133330e",
											borderTopLeftRadius: 2,
											borderTopRightRadius: 2,
									  }
									: error == 2
									  ? {
												border: "1px solid var(--green)",
												background: "#65d1330e",
												borderTopLeftRadius: 2,
												borderTopRightRadius: 2,
										  }
									  : {
												border: "1px solid transparent",
												borderTopLeftRadius: 2,
												borderTopRightRadius: 2,
										  }
							}
							onChange={(e) => {
								setError(0);
								setPass(e.target.value);
							}}
							placeholder="Passw*rd"
						/>
					</div>
					{error == -1 ? (
						<button
							style={{
								border: "2px solid var(--yellow)",
								backgroundColor: "#ffca630e !important",
								color: "var(--yellow) !important",
							}}
							disabled
							onClick={() => {}}
						>
							Logging in
						</button>
					) : (
						<button onClick={save}>Login</button>
					)}
				</div>
			</div>
			
		</main>
	);
}
