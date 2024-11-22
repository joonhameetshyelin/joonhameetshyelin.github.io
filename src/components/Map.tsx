import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { IMG_MAP, IMG_BUILDING1, IMG_BUILDING2 } from "@/constants/images";
import Building from "./Building";
import MarkerIcon from "@/icon/marker.svg";

export const Map = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ref를 사용하여 path element를 참조
  const pathRef = useRef<SVGPathElement | null>(null);
  const [dashOffset, setDashOffset] = useState(0); // 초기 dashOffset을 0으로 설정
  const [pathLength, setPathLength] = useState(0);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const pathData = `
 M107.6582 930.338 L583.159 623.839 L224.1625 410.338 L916.162 0.8389`;

  // 애니메이션을 위한 상태 추가
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      setDashOffset(length);

      const startPoint = pathRef.current.getPointAtLength(0);
      setCirclePosition({ x: startPoint.x, y: startPoint.y });

      // 모든 초기화가 완료된 후에 isInitialized를 true로 설정
      setIsInitialized(true);
    }
  }, []);

  // 시작점과 도착점에 따른 진행률 범위를 계산하는 함수 추가
  const getPathRange = (from: string, to: string) => {
    const ranges: any = {
      "building1-building2": { start: 0.7, end: 0.75 },
      "building2-building1": { start: 0.75, end: 0.7 },
      "building1-building3": { start: 0.7, end: 0.3 },
      "building3-building1": { start: 0.3, end: 0.7 },
      "building2-building3": { start: 0.75, end: 0.3 },
      "building3-building2": { start: 0.3, end: 0.75 },
    };

    const key = `${from}-${to}`;
    return ranges[key] || { start: 0, end: 0 };
  };

  const moveCircleAlongPath = (
    percentage: number,
    fromBuilding: string | null
  ) => {
    if (!pathRef.current) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const totalLength = pathRef.current.getTotalLength();
    const FIXED_DURATION = 2000;
    const startTime = performance.now();

    // 초기 선택인 경우 (fromBuilding이 null)
    if (!fromBuilding) {
      const startLength = 0;
      const targetLength = totalLength * percentage;
      const startDashOffset = pathLength;
      const endDashOffset = pathLength * (1 - percentage);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / FIXED_DURATION, 1);

        const currentLength =
          startLength + (targetLength - startLength) * progress;
        const currentDashOffset =
          startDashOffset + (endDashOffset - startDashOffset) * progress;

        Promise.resolve().then(() => {
          const point = pathRef.current!.getPointAtLength(currentLength);
          setCirclePosition({ x: point.x, y: point.y });
          setDashOffset(currentDashOffset);
        });

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      setIsAnimating(true);
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // 빌딩 간 이동인 경우
    const pathRange = getPathRange(fromBuilding, selectedBuilding);
    const startLength = totalLength * pathRange.start;
    const targetLength = totalLength * pathRange.end;

    // 현재 구간의 dashOffset 계산
    const currentDashLength =
      Math.abs(pathRange.end - pathRange.start) * pathLength;
    const initialDashOffset =
      pathLength * (1 - Math.max(pathRange.start, pathRange.end));
    const finalDashOffset =
      pathLength * (1 - Math.min(pathRange.start, pathRange.end));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / FIXED_DURATION, 1);

      const currentLength =
        startLength + (targetLength - startLength) * progress;
      const currentDashOffset =
        initialDashOffset + (finalDashOffset - initialDashOffset) * progress;

      Promise.resolve().then(() => {
        const point = pathRef.current!.getPointAtLength(currentLength);
        setCirclePosition({ x: point.x, y: point.y });
        // 현재 구간만 보이도록 dashArray 조정
        pathRef.current!.style.strokeDasharray = `${currentDashLength} ${
          pathLength - currentDashLength
        }`;
        setDashOffset(currentDashOffset);
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    setIsAnimating(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  // handleBuildingSelection 함수 수정
  const handleBuildingSelection = (building: string) => {
    let percentage = 1;

    if (building === selectedBuilding) {
      return;
    }

    switch (building) {
      case "building1":
        percentage = 0.7;
        break;
      case "building2":
        percentage = 0.75;
        break;
      case "building3":
        percentage = 0.3;
        break;
      default:
        percentage = 0;
        break;
    }

    // path의 dashOffset 설정을 moveCircleAlongPath 내부로 이동
    // 첫 선택인 경우 fromBuilding은 null
    moveCircleAlongPath(percentage, selectedBuilding);
    setSelectedBuilding(building);
  };
  return (
    <Container>
      <Background>
        <svg
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <image
            href={IMG_MAP}
            x="0"
            y="0"
            width="1000"
            height="1000"
            preserveAspectRatio="xMidYMid slice"
          />
          <g>
            <Building
              id="building1"
              x={0.28 * 1000}
              y={0.08 * 1000}
              width={200}
              height={200}
              svgUrl={IMG_BUILDING1}
              onClick={handleBuildingSelection}
            />
          </g>
          <g>
            <StyledMarkerIcon
              width={50}
              height={50}
              x={370}
              y={60}
              fill={selectedBuilding === "building1" ? "#613EEA" : "black"}
            />
          </g>

          <g>
            <Building
              id="building3"
              x={460}
              y={400}
              width={200}
              height={220}
              svgUrl={IMG_BUILDING2}
              onClick={handleBuildingSelection}
            />
          </g>

          <g>
            <Building
              id="building2"
              x={530}
              y={100}
              width={200}
              height={220}
              svgUrl={IMG_BUILDING1}
              onClick={handleBuildingSelection}
            />
          </g>

          {/* 원형 */}
          <circle
            cx={circlePosition.x}
            cy={circlePosition.y}
            r="20"
            fill="#613EEA"
            style={{
              filter: "drop-shadow(0 0 10px rgba(97, 62, 234, 0.5))", // 선택적: 글로우 효과 추가
            }}
          />
          <path
            ref={pathRef}
            d={pathData}
            stroke="#613EEA"
            fill="transparent"
            strokeWidth="16"
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: "none",
              opacity: isInitialized ? 1 : 0,
            }}
          />
        </svg>
      </Background>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2; // canvas가 SVG 위에 그려지도록
  }

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledMarkerIcon = styled(MarkerIcon)`
  transition: fill 0.3s ease-in-out; // fill 속성 애니메이션 추가
  cursor: pointer;

  &:hover {
    fill: #ff7f50; // 호버 시 색상 변경 (예: 코랄 색상)
  }
`;
