import Skeleton from 'react-loading-skeleton';

export default function Loader() {
  return (
    <>
      <Skeleton style={{ borderRadius: 16 }} height={160} width={'100%'} />
      <Skeleton style={{ borderRadius: 16 }} height={160} width={'100%'} />
      <Skeleton style={{ borderRadius: 16 }} height={160} width={'100%'} />
      <Skeleton style={{ borderRadius: 16 }} height={160} width={'100%'} />
    </>
  );
}
