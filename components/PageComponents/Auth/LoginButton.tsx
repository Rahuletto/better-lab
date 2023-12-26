import { MouseEventHandler } from 'react';

export default function LoginButton({
  error,
  onClick,
}: {
  error: number;
  onClick: MouseEventHandler;
}) {
  return error === -1 ? (
    <button
      style={{
        border: '2px solid var(--yellow)',
        backgroundColor: '#ffca630e !important',
        color: 'var(--yellow) !important',
      }}
      disabled>
      Logging in
    </button>
  ) : (
    <button onClick={onClick}>Login</button>
  );
}
