import Skeleton from "react-loading-skeleton";

export default function Loader() {
  return (
    <>
      <Skeleton style={{ borderRadius: 16 }} height={"100%"} width={'100%'} />
    </>
  );
}
