const { CONTROLS, COMPASS_POINTS } = require('./constants');

const getCardinalDirections = (start, turn) => {
  if (turn === CONTROLS.LEFT) {
    if (start === COMPASS_POINTS.NORTH) return COMPASS_POINTS.WEST;
    if (start === COMPASS_POINTS.WEST) return COMPASS_POINTS.SOUTH;
    if (start === COMPASS_POINTS.SOUTH) return COMPASS_POINTS.EAST;
    if (start === COMPASS_POINTS.EAST) return COMPASS_POINTS.NORTH;
  }

  if (turn === CONTROLS.RIGHT) {
    if (start === COMPASS_POINTS.NORTH) return COMPASS_POINTS.EAST;
    if (start === COMPASS_POINTS.EAST) return COMPASS_POINTS.SOUTH;
    if (start === COMPASS_POINTS.SOUTH) return COMPASS_POINTS.WEST;
    if (start === COMPASS_POINTS.WEST) return COMPASS_POINTS.NORTH;
  }
};

const getCoordinatesAfterMove = (plateauSize, coordinates) => {
  let [x, y, compassPoint] = coordinates;

  switch (compassPoint) {
    case COMPASS_POINTS.NORTH:
      y = y + 1;
      break;
    case COMPASS_POINTS.SOUTH:
      y = y - 1;
      break;
    case COMPASS_POINTS.WEST:
      x = x - 1;
      break;
    case COMPASS_POINTS.EAST:
      x = x + 1;
      break;
    default:
      break;
  }

  if (y < 0 || y > plateauSize[1] || x < 0 || x > plateauSize[0])
    throw new Error(`Can't send rover outside the plato.`);

  return [x, y, compassPoint];
};

const getPlateauSize = (plateauLine) => {
  try {
    return plateauLine
      .replace(/[^\d]/g, ' ')
      .split(' ')
      .filter(Number)
      .map((i) => parseInt(i));
  } catch (e) {
    throw new Error(`Unable to parse plateau size`);
  }
};

const calculatePosition = ({ plateauSize, roverInput, rover }) => {
  try {
    const { landing, instructions } = roverInput;

    if (plateauSize.length !== 2) throw new Error(`Unknown plateau size`);
    if (!landing) throw new Error(`No landing data`);
    if (!instructions) throw new Error(`No instructions data`);

    let coordinates = landing.split(' ').map((value, i) => {
      if (i === 2) return value;
      return parseInt(value);
    });

    [...instructions].forEach((instruction) => {
      switch (instruction) {
        case CONTROLS.LEFT:
          coordinates[2] = getCardinalDirections(coordinates[2], CONTROLS.LEFT);
          break;
        case CONTROLS.RIGHT:
          coordinates[2] = getCardinalDirections(
            coordinates[2],
            CONTROLS.RIGHT
          );
          break;
        case CONTROLS.MOVE:
          coordinates = getCoordinatesAfterMove(plateauSize, coordinates);
          break;
        default:
          throw new Error(`Unknown control: ${instruction}`);
      }
    });

    return coordinates.join(' ');
  } catch (e) {
    console.error(`Unable to get values for ${rover}:`, e);
    return 'unknown';
  }
};

module.exports = {
  getPlateauSize,
  calculatePosition,
};
