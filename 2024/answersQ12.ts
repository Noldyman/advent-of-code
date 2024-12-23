import fs from "fs";
const input = fs.readFileSync("./inputs/inputQ12.txt", "utf-8");

type Region = {
  area: number;
  perimeter: number;
};

type Regions = { [k: string]: Region };

type Coordinate = [number, number];

const formatInput = () => {
  return input.split("\n").filter((row) => !!row);
};

const getRegions = (rows: string[]) => {
  const regions: Regions = {};
  let exploredCoordinates = "";
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const coordStr = "|" + x + ";" + y + "|";
      if (exploredCoordinates.includes(coordStr)) {
        continue;
      }

      const regionId = rows[y][x];
      const regionKey = regionId + "_" + x + ";" + y;
      regions[regionKey] = {
        area: 0,
        perimeter: 0,
      };

      let shouldCheck: Coordinate[] = [[x, y]];

      while (shouldCheck.length > 0) {
        const newShouldCheck: Coordinate[] = [];
        shouldCheck.forEach(([xx, yy]) => {
          exploredCoordinates += "|" + xx + ";" + yy + "|" + ",";
          regions[regionKey].area += 1;
          const topRightBottomLeft: Coordinate[] = [
            [xx, yy - 1],
            [xx + 1, yy],
            [xx, yy + 1],
            [xx - 1, yy],
          ];
          topRightBottomLeft.forEach(([xxx, yyy]) => {
            if (
              yyy < 0 ||
              yyy >= rows.length ||
              xxx < 0 ||
              xxx >= rows[y].length
            ) {
              regions[regionKey].perimeter += 1;
            } else {
              const curr = rows[yyy]?.[xxx];
              const currStr = "|" + xxx + ";" + yyy + "|";

              if (curr === regionId) {
                if (
                  !exploredCoordinates.includes(currStr) &&
                  !newShouldCheck.find((c) => c[0] === xxx && c[1] === yyy)
                ) {
                  newShouldCheck.push([xxx, yyy]);
                }
              } else {
                regions[regionKey].perimeter += 1;
              }
            }
          });
        });
        shouldCheck = newShouldCheck;
      }
    }
  }
  return regions;
};

const getTotalPrice = (regions: Regions) => {
  let price = 0;
  const keys = Object.keys(regions);

  keys.forEach((key) => {
    price += regions[key].area * regions[key].perimeter;
  });

  return price;
};

const rows = formatInput();
const regions = getRegions(rows);
console.log(`Answer to Q12A: ${getTotalPrice(regions)}`);
