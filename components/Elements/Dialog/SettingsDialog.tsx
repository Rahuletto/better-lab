import { RegisteredCourse } from '@/types';
import dialogHandler from '@/utils/DialogHandler';
import { ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import styles from './Dialog.module.css';

export default function SettingsDialog({
  logout,
  user,
  regData,
  courseId,
  changeCourses,
}: {
  logout: MouseEventHandler<HTMLButtonElement>;
  user: string;
  regData?: RegisteredCourse | null;
  courseId?: string;
  changeCourses?: ChangeEventHandler<HTMLSelectElement>;
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              gap: 8,
            }}
            method="dialog"
            className="container d-flex flex-column">
            <div style={{ display: 'flex', gap: 8 }}>
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
            {regData && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <p style={{ margin: 0, color: 'var(--level-color)' }}>
                  Course:{' '}
                </p>
                <select value={courseId} onChange={changeCourses}>
                  {regData.courses.map(
                    (
                      el: { COURSE_ID: number; COURSE_NAME: string },
                      index: number
                    ) => {
                      return (
                        <option
                          style={{ textTransform: 'capitalize' }}
                          key={index}
                          value={`${el.COURSE_ID}|${el.COURSE_NAME}`}>
                          {el.COURSE_NAME.toLowerCase()}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
