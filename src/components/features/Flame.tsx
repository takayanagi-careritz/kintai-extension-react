import { Popup } from "@/components/common/Popup";

export const Flame = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        /*
          REFACTOR: 色定義、CSS切り出し
        */
        backgroundColor: "#FFF9E3",
      }}
    >
      <Popup />
    </div>
  );
};
