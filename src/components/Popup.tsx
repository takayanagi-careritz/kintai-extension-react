export const Popup = () => {
  const onClick = () => alert("hello world");

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#30f0f0",
      }}
    >
      <button
        style={{
          height: "30px",
        }}
        onClick={onClick}
      >
        こんにちはボタン
      </button>
    </div>
  );
};
