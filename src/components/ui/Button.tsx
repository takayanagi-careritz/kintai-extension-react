import MuiButton from "@mui/material/Button";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <MuiButton
      variant="outlined"
      color="primary"
      sx={{ borderWidth: 2 }}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
