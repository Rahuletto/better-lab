import { useEffect, useState } from 'react';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [uid, setUid] = useState('');
  const [pass, setPass] = useState('');

  const [error, setError] = useState(0);

  const [server, setServers] = useState<any>('');

  function save() {
    setError(-1);
    if (uid.length != 12) return setError(1);
    fetch('/api/login?server=' + server, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(uid)}`,
      },
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
            | { Status: 0; success: boolean; token: string }
        ) => {
          if (a.Status == 1) {
            setError(2);
            localStorage.setItem('server', server);
            localStorage.setItem('userid', uid);
            router.push('/course');
          } else if (a.Status == 0) {
            setError(1);
          }
        }
      );
  }

  useEffect(() => {
    const no = localStorage.getItem('userid');
    if (no) router.push('/course');

    const sr = localStorage.getItem('server');
    setServers(sr);

    fetch('/api/status')
      .then((d) => d.json())
      .then((a) => {
        if (a.Status != 1) router.push('/offline');
      });
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Better-Lab</h1>
        <div className={styles.login}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input
              value={uid}
              maxLength={12}
              pattern="[0-9]{12}"
              minLength={12}
              style={
                error == 1
                  ? {
                      border: '1px solid var(--red)',
                      background: '#D133330e',
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                    }
                  : error == 2
                  ? {
                      border: '1px solid var(--green)',
                      background: '#65d1330e',
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                    }
                  : {
                      border: '1px solid transparent',
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
                      border: '1px solid var(--red)',
                      background: '#D133330e',
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                    }
                  : error == 2
                  ? {
                      border: '1px solid var(--green)',
                      background: '#65d1330e',
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                    }
                  : {
                      border: '1px solid transparent',
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

          {server ? (
            <select
              required
              value={server}
              onChange={(e) => setServers(e.target.value)}>
              <option disabled>Select batch</option>
              <optgroup label="Kattankulathur">
                <option value="ktretelab2023">KTR 2023</option>
                <option value="ktretelab2022">KTR 2022</option>
                <option value="ktretelab2021">KTR 2021</option>
                <option value="ktretelab2020">KTR 2020</option>
              </optgroup>
              <optgroup label="Ramapuram">
                <option value="rmpetelab2023">RMP 2023</option>
                <option value="rmpetelab2022">RMP 2022</option>
                <option value="rmpetelab2021">RMP 2021</option>
                <option value="rmpetelab2020">RMP 2020</option>
              </optgroup>
              <optgroup label="Vadapalani">
                <option value="vdpetelab2023">VDP 2023</option>
                <option value="vdpetelab2022">VDP 2022</option>
                <option value="vdpetelab2021">VDP 2021</option>
                <option value="vdpetelab2020">VDP 2020</option>
              </optgroup>
            </select>
          ) : (
            <select required onChange={(e) => setServers(e.target.value)}>
              <option selected disabled>
                Select batch
              </option>
              <optgroup label="Kattankulathur">
                <option value="ktretelab2023">KTR 2023</option>
                <option value="ktretelab2022">KTR 2022</option>
                <option value="ktretelab2021">KTR 2021</option>
                <option value="ktretelab2020">KTR 2020</option>
              </optgroup>
              <optgroup label="Ramapuram">
                <option value="rmpetelab2023">RMP 2023</option>
                <option value="rmpetelab2022">RMP 2022</option>
                <option value="rmpetelab2021">RMP 2021</option>
                <option value="rmpetelab2020">RMP 2020</option>
              </optgroup>
              <optgroup label="Vadapalani">
                <option value="vdpetelab2023">VDP 2023</option>
                <option value="vdpetelab2022">VDP 2022</option>
                <option value="vdpetelab2021">VDP 2021</option>
                <option value="vdpetelab2020">VDP 2020</option>
              </optgroup>
            </select>
          )}
          {error == -1 ? (
            <button
              style={{
                border: '2px solid var(--yellow)',
                backgroundColor: '#ffca630e !important',
                color: 'var(--yellow) !important',
              }}
              disabled
              onClick={() => {}}>
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
