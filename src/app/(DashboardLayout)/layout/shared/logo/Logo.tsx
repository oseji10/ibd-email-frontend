import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo2 = () => {
  return (
    <LinkStyled href="/">
      <Image src="https://app.ibd.ng/images/ibd-logo.png" alt="logo" height={50} width={100} priority />
    </LinkStyled>
  );
};

export default Logo2;
  