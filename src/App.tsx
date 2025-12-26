import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVariants: Variants = {
  hover: { scale: 1.5 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(255, 162, 64)", transition: { duration: 10 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={1} //끌어당긴 힘
          dragConstraints={biggerBoxRef}
          variants={boxVariants}
          whileHover="hover"
          whileDrag="drag" // white blue 같은 문자열은 인식을 잘 못함
          whileTap="click"
        ></Box>
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
