import dynamic from 'next/dynamic';
import { Item, Menu, RightSlot, Separator } from 'react-contexify';

import 'react-contexify/dist/ReactContexify.css';
import { IconType } from 'react-icons';

const BiSearch = dynamic<React.ComponentProps<IconType>>(
  () => import('react-icons/bi').then((mod) => mod.BiSearch),
  { ssr: false },
);
const BiSolidCopy = dynamic<React.ComponentProps<IconType>>(
  () => import('react-icons/bi').then((mod) => mod.BiSolidCopy),
  { ssr: false },
);
const TbCut = dynamic<React.ComponentProps<IconType>>(
  () => import('react-icons/tb').then((mod) => mod.TbCut),
  { ssr: false },
);

const LuClipboardPaste = dynamic<React.ComponentProps<IconType>>(
  () => import('react-icons/lu').then((mod) => mod.LuClipboardPaste),
  { ssr: false },
);

const CodeMenu = () => {
  return (
    <Menu id={'elab'}>
      <Item
        onClick={() =>
          document.getElementsByClassName('cm-content')[0].dispatchEvent(
            new KeyboardEvent('keydown', {
              ctrlKey: true,
              shiftKey: true,
              key: 'f',
            }),
          )
        }>
        <BiSearch style={{ marginRight: '8px' }} /> Find
        <RightSlot className="key">
          <span className="ctrl">Ctrl</span> <span className="f">F</span>
        </RightSlot>
      </Item>

      <Separator />
      <Item onClick={() => document.execCommand('cut')}>
        <TbCut style={{ marginRight: '8px' }} /> Cut{' '}
        <RightSlot className="key">
          <span className="ctrl">Ctrl</span> <span className="x">X</span>
        </RightSlot>
      </Item>
      <Item onClick={() => document.execCommand('copy')}>
        <BiSolidCopy style={{ marginRight: '8px' }} /> Copy{' '}
        <RightSlot className="key">
          <span className="ctrl">Ctrl</span> <span className="c">C</span>
        </RightSlot>
      </Item>
      <Item
        onClick={async () => {
          document.execCommand(
            'insertText',
            true /*no UI*/,
            await navigator.clipboard.readText(),
          );
        }}>
        <LuClipboardPaste style={{ marginRight: '8px' }} /> Paste
        <RightSlot className="key">
          <span className="ctrl">Ctrl</span> <span className="v">V</span>
        </RightSlot>
      </Item>
    </Menu>
  );
};

export default CodeMenu;
