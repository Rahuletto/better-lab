import { ChangeEventHandler } from 'react';

export default function LoginInput({
  type,
  onChange,
  uid,
  error,
}: {
  type: 'Password' | 'UID';
  onChange: ChangeEventHandler<HTMLInputElement>;
  uid: string;
  error: number;
}) {
  if (type === 'UID')
    return (
      <input
        value={uid}
        maxLength={12}
        pattern="[0-9]{12}"
        minLength={12}
        style={
          error === 1
            ? {
                border: '1px solid var(--red)',
                background: '#D133330e',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }
            : error === 2
            ? {
                border: '1px solid var(--green)',
                background: '#45d1330e',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }
            : {
                border: '1px solid transparent',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }
        }
        onChange={onChange}
        placeholder="User ID"
      />
    );
  else
    return (
      <input
        type="password"
        value={uid}
        style={
          error === 1
            ? {
                border: '1px solid var(--red)',
                background: '#D133330e',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }
            : error === 2
            ? {
                border: '1px solid var(--green)',
                background: '#45d1330e',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }
            : {
                border: '1px solid transparent',
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }
        }
        onChange={onChange}
        placeholder="Passw*rd"
      />
    );
}
