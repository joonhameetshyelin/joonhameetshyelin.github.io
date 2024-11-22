interface BuildingProps {
  id: string;
  x: number;
  y: number;
  svgUrl: string;
  onClick: (id: string) => void;
  width: number;
  height: number;
}

const Building = ({
  id,
  x,
  y,
  svgUrl,
  onClick,
  width,
  height,
}: BuildingProps) => {
  return (
    <image
      href={svgUrl}
      x={x}
      y={y}
      width={width}
      height={height}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(id)}
    />
  );
};

export default Building;
