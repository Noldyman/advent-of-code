import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ8.txt", "utf-8");

type Distance = { id1: number; id2: number; distance: number };
type Point = {
  id: number;
  x: number;
  y: number;
  z: number;
};

const formatData = () => {
  const points: Point[] = input
    .split("\n")
    .filter((l) => !!l)
    .map((l, index) => {
      const [x, y, z] = l.split(",").map(Number) as [number, number, number];
      return { id: index, x, y, z };
    });

  const distances: Distance[] = [];

  for (let i = 0; i < points.length; i++) {
    const currPoint = points[i];
    innerLoop: for (let y = i + 1; y < points.length; y++) {
      const comparePoint = points[y];

      const distance = Math.sqrt(
        Math.pow(Math.abs(currPoint.x - comparePoint.x), 2) +
          Math.pow(Math.abs(currPoint.y - comparePoint.y), 2) +
          Math.pow(Math.abs(currPoint.z - comparePoint.z), 2)
      );
      distances.push({ id1: currPoint.id, id2: comparePoint.id, distance });
    }
    console.log(distances);
  }
  const sortedDistances = distances.sort((a, b) => a.distance - b.distance);

  return { points, distances: sortedDistances };
};

const connectShortest = (
  numberOfConnections: number,
  points: Point[],
  distances: Distance[]
) => {
  let connectedIds: number[][] = points.map(({ id }) => [id]);
  let connectionCount = 0;

  for (const distance of distances) {
    if (connectionCount === numberOfConnections - 1) {
      break;
    }

    const connectIndex1 = connectedIds.findIndex((line) =>
      line.includes(distance.id1)
    );
    const connectIndex2 = connectedIds.findIndex((line) =>
      line.includes(distance.id2)
    );

    if (connectIndex1 !== connectIndex2) {
      const newLine = [
        ...connectedIds[connectIndex1],
        ...connectedIds[connectIndex2],
      ];

      const newConnectionIds: number[][] = connectedIds.filter(
        (_, index) => ![connectIndex1, connectIndex2].includes(index)
      );
      newConnectionIds.push(newLine);
      connectedIds = newConnectionIds;
      connectionCount += 1;
    }
  }

  const sortedConnectionIds = connectedIds.sort((a, b) => b.length - a.length);

  return (
    sortedConnectionIds[0].length *
    sortedConnectionIds[1].length *
    sortedConnectionIds[2].length
  );
};

const { points, distances } = formatData();
// console.log(distances);
console.log(connectShortest(1000, points, distances));
