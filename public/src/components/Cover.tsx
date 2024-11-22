import styled, { keyframes } from "styled-components";
import { IMG_MAIN } from "@/constants/images";
import localFont from "next/font/local";

const Francisco = localFont({
  src: "../pages/fonts/FranciscoDemo.ttf",
  variable: "--font-francisco",
  weight: "100 900",
});

interface IProps {
  visible: boolean;
  handleCoverClick: () => void;
}
export const Cover = ({ visible, handleCoverClick }: IProps) => {
  return (
    <Container visible={visible} onClick={handleCoverClick}>
      <Header>
        <Name>PARK HYELIN</Name>
        <Name>SEO JOONHA</Name>
      </Header>
      <ImgBox>
        <Img src={IMG_MAIN} alt="cover" />
      </ImgBox>
      <TextBox className={Francisco.className}>
        <Text>Happily</Text>
        <Text>Ever</Text>
        <Text>After</Text>
      </TextBox>
      <Bottom>
        <BottomText>2025.02.09 SUN 11:30</BottomText>
        <BottomText>천안아산역 CA웨딩컨벤션 블리스홀</BottomText>
      </Bottom>
    </Container>
  );
};

const Container = styled.section<{ visible: boolean }>`
  touch-action: pan-y;
  position: absolute;
  z-index: 99;
  top: 0;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);
  transition: all 0.6s ease;
  font-size: 1rem;

  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const ImgBox = styled.span`
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  width: initial;
  height: initial;
  background: none;
  opacity: 1;
  border: 0px;
  margin: 0px;
  padding: 0px;
  position: absolute;
  inset: 0px;
`;

const Img = styled.img`
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100% !important;
  max-width: 440px !important;
  min-height: 100% !important;
  max-height: 100% !important;
  object-fit: cover;
`;
// 애니메이션 정의: 왼쪽에서 오른쪽으로 이동
const slideIn = keyframes`
   0% {
    transform: translate3d(-30px, 0, 0);
    opacity: 0;
  }
 
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;

const TextBox = styled.div`
  z-index: 100;
  color: #fff;
  position: absolute;
  top: 90px;
  left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 68px;
  line-height: 52px;
  letter-spacing: 14px;
`;

const Text = styled.div`
  animation: ${slideIn} 1.2s ease-out forwards;
  opacity: 0;

  /* 각 div에 대해 애니메이션 딜레이를 추가하여 순차적으로 나타나게 */
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.8s;
  }
`;

const FadeInup = keyframes`
0% {
    opacity: 0;
    transform: translate3d(0px, 5%, 0px);
}

100% {
    opacity: 1;
    transform: translateZ(0px);
}
`;
const Header = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  letter-spacing: -0.8px;
  line-height: 14px;
  font-size: 14px;
  padding: 0 12px;
`;

const Name = styled.div`
  opacity: 0;
  animation: 1.5s ease 2.5s 1 normal forwards running ${FadeInup};

  /* 각 div에 대해 애니메이션 딜레이를 추가하여 순차적으로 나타나게 */
  &:nth-child(1) {
    animation-delay: 1.3s;
  }
  &:nth-child(2) {
    animation-delay: 1.8s;
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
  letter-spacing: -0.4px;
  gap: 6px;
`;

const BottomText = styled.div`
  opacity: 0;
  animation: 1.5s ease 2.5s 1 normal forwards running ${FadeInup};

  /* 각 div에 대해 애니메이션 딜레이를 추가하여 순차적으로 나타나게 */
  &:nth-child(1) {
    animation-delay: 1.3s;
    font-size: 16px;
    font-weight: 600;
  }
  &:nth-child(2) {
    animation-delay: 1.8s;
    font-weight: 400;
  }
`;
