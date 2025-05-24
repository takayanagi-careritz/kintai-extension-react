import Button from "@mui/material/Button";

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
        backgroundColor: "#f030f0",
      }}
    >
      <Button variant="contained" color="primary" onClick={onClick}>
        こんにちはボタン
      </Button>
    </div>
  );
};
