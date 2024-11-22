import styled from "styled-components";
import localFont from "next/font/local";

const BatangFont = localFont({
  src: [
    {
      path: "../pages/fonts/GowunBatang-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../pages/fonts/GowunBatang-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Arial", "sans-serif"], // 대체 폰트
  variable: "--font-batang", // 선택 사항: CSS 변수 이름
});

interface IProps {
  visible: boolean;
}

export const Main = ({ visible }: IProps) => {
  return (
    <Section visible={visible} className={BatangFont.className}>
      <div style={{ height: "20000px" }}>sfds</div>
    </Section>
  );
};

const Section = styled.section<{ visible: boolean }>`
  padding-top: 60px;
  width: 100%;
  opacity: ${({ visible }) => (visible ? 0 : 1)};
  height: ${({ visible }) => (visible ? `calc(var(--vh, 1vh) * 100)` : "auto")};
  transition: all 0.9s ease;
`;
