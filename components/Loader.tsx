import Skeleton from "react-loading-skeleton";

function Loader() {
  return (
    <div
      style={{
        padding: "8px 20px",
        height: "100%",
        background: "var(--code-editor)",
      }}
    >
      <Skeleton style={{ width: "400px" }} />
      <br></br>
      <Skeleton style={{ width: "200px" }} />
      <Skeleton style={{ width: "300px" }} />
      <br></br>
      <Skeleton style={{ width: "600px" }} />
      <Skeleton style={{ width: "160px" }} />
      <Skeleton style={{ width: "60px" }} />
    </div>
  );
}
export default Loader;
