import { Button } from "@/components/ui/Button";

export const Popup = () => {
  const onClick = () => alert("hello world");

  return (
    <div>
      <Button onClick={onClick}>こんにちはボタン</Button>
    </div>
  );
};
