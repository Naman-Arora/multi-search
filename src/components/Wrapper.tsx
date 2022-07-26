import { Box } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

const Wrapper = (props: Props) => {
  return (
    <>
      <Box
        component="main"
        sx={{ paddingLeft: "4rem", paddingRight: "4rem", paddingTop: "11rem" }}
      >
        {props.children}
      </Box>
    </>
  );
};

export default Wrapper;
