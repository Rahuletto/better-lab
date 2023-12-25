export default function dialogHandler(e: MouseEvent | any) {
  if (e.target?.tagName !== 'DIALOG') return;

  const rect = e.target.getBoundingClientRect();

  const touch =
    e?.changedTouches && e?.changedTouches?.length != 0
      ? e.changedTouches[0]
      : e;

  const clickedInDialog =
    rect.top <= touch.clientY &&
    touch.clientY <= rect.top + rect.height &&
    rect.left <= touch.clientX &&
    touch.clientX <= rect.left + rect.width;

  if (clickedInDialog === false) e.target.close();
}
