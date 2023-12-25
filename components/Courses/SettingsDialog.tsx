import { MouseEventHandler, useEffect } from 'react';
import styles from '@/styles/Course.module.css';
import { dialogHandler } from '../Question/QuestionDisplay/QuestionDisplay';

export default function SettingsDialog({
  logout,
  user,
}: {
  logout: MouseEventHandler<HTMLButtonElement>;
  user: string;
}) {
  useEffect(() => {
    if (user) {
      const settings = document.getElementById('settings') as HTMLDialogElement;

      settings?.addEventListener('click', (e: MouseEvent) => {
        dialogHandler(e);
      });

      settings?.addEventListener('touchend', (e: TouchEvent) => {
        dialogHandler(e);
      });
      return () => {
        settings?.removeEventListener('click', dialogHandler);
        settings?.removeEventListener('touchend', dialogHandler);
      };
    }
  }, [user]);

  return (
    <dialog
      className={styles.dialog}
      id="settings"
      style={{ paddingBottom: '24px !important' }}>
      <div className="container d-flex flex-column justify-content-around">
        <div className="row">
          <h1>Settings</h1>
        </div>
        <div className="row d-flex">
          <form
            style={{ padding: 0, gap: 8 }}
            method="dialog"
            className="container d-flex flex-column">
            <div className={styles.settingFlex}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                {user && (
                  <input
                    style={{
                      opacity: 0.9,
                      color: '#b1b1b1',
                      cursor: 'not-allowed',
                    }}
                    disabled={true}
                    className="col-12 p-2"
                    pattern="[0-9]{12}"
                    value={user}
                  />
                )}
                <button className={styles.logout} onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
