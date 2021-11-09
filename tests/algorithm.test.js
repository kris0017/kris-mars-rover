const {
  getCardinalDirections,
  getCoordinatesAfterMove,
  getPlateauSize,
  calculatePosition,
} = require('../functions/algorithm');
const { COMPASS_POINTS, CONTROLS } = require('../utils/constants');

describe('getCardinalDirections', () => {
  test('should return correct directions for left turn', () => {
    expect(getCardinalDirections(COMPASS_POINTS.NORTH, CONTROLS.LEFT)).toBe(
      COMPASS_POINTS.WEST
    );
    expect(getCardinalDirections(COMPASS_POINTS.WEST, CONTROLS.LEFT)).toBe(
      COMPASS_POINTS.SOUTH
    );
    expect(getCardinalDirections(COMPASS_POINTS.SOUTH, CONTROLS.LEFT)).toBe(
      COMPASS_POINTS.EAST
    );
    expect(getCardinalDirections(COMPASS_POINTS.EAST, CONTROLS.LEFT)).toBe(
      COMPASS_POINTS.NORTH
    );
  });

  test('should return correct directions for right turn', () => {
    expect(getCardinalDirections(COMPASS_POINTS.NORTH, CONTROLS.RIGHT)).toBe(
      COMPASS_POINTS.EAST
    );
    expect(getCardinalDirections(COMPASS_POINTS.EAST, CONTROLS.RIGHT)).toBe(
      COMPASS_POINTS.SOUTH
    );
    expect(getCardinalDirections(COMPASS_POINTS.SOUTH, CONTROLS.RIGHT)).toBe(
      COMPASS_POINTS.WEST
    );
    expect(getCardinalDirections(COMPASS_POINTS.WEST, CONTROLS.RIGHT)).toBe(
      COMPASS_POINTS.NORTH
    );
  });
});

describe('getCoordinatesAfterMove', () => {
  const plateauSize = [5, 5];
  const getExpected = (compassPoint) => [1, 1, compassPoint];

  it('should return correct coordinates on move to the north', () => {
    const expected = getExpected(COMPASS_POINTS.NORTH);
    const previousCoordinates = [1, 0, COMPASS_POINTS.NORTH];
    const result = getCoordinatesAfterMove(plateauSize, previousCoordinates);

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should return correct coordinates on move to the south', () => {
    const expected = getExpected(COMPASS_POINTS.SOUTH);
    const previousCoordinates = [1, 2, COMPASS_POINTS.SOUTH];
    const result = getCoordinatesAfterMove(plateauSize, previousCoordinates);

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should return correct coordinates on move to the east', () => {
    const expected = getExpected(COMPASS_POINTS.EAST);
    const previousCoordinates = [0, 1, COMPASS_POINTS.EAST];
    const result = getCoordinatesAfterMove(plateauSize, previousCoordinates);

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should return correct coordinates on move to the west', () => {
    const expected = getExpected(COMPASS_POINTS.WEST);
    const previousCoordinates = [2, 1, COMPASS_POINTS.WEST];
    const result = getCoordinatesAfterMove(plateauSize, previousCoordinates);

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should throw error about plateau size', () => {
    const previousCoordinates = [5, 5, COMPASS_POINTS.NORTH];

    function moveWithBadCoordinates() {
      getCoordinatesAfterMove([1, 1], previousCoordinates);
    }

    expect(moveWithBadCoordinates).toThrowError(
      `Can't send rover outside the plato.`
    );
  });
});

describe('getPlateauSize', () => {
  const plateauLine = `Plateau:5 10`;

  it('should return array with values [5, 10]', () => {
    const expected = [5, 10];
    const result = getPlateauSize(plateauLine);

    expect(result).toEqual(expect.arrayContaining(expected));
  });

  it('should throw error "Unable to parse plateau size"', () => {
    function emptyFunctionCall() {
      getPlateauSize();
    }
    expect(emptyFunctionCall).toThrowError(`Unable to parse plateau size`);
  });
});

describe('calculatePosition', () => {
  let consoleSpy;
  const plateauSize = [5, 5];
  const roverInput = {
    landing: '1 2 N',
    instructions: 'LMLMLMLMM',
  };
  const rover = 'TestRover';

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    console.error.mockRestore();
  });
  afterEach(() => {
    console.error.mockClear();
  });

  it('should show error "Unknown plateau size" in console, return unknown', () => {
    const result = calculatePosition({ rover });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Unable to get values for ${rover}. Error: Unknown plateau size`
    );
    expect(result).toBe('unknown');
  });

  it('should show error "No landing data" in console, return unknown', () => {
    const result = calculatePosition({
      plateauSize,
      rover,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Unable to get values for ${rover}. Error: No landing data`
    );
    expect(result).toBe('unknown');
  });

  it('should show error "No instructions data" in console, return unknown', () => {
    const result = calculatePosition({
      plateauSize,
      roverInput: { ...roverInput, instructions: '' },
      rover,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Unable to get values for ${rover}. Error: No instructions data`
    );
    expect(result).toBe('unknown');
  });

  it('should show error "Unknown control: X" in console, return unknown', () => {
    const result = calculatePosition({
      plateauSize,
      roverInput: { ...roverInput, instructions: 'X' },
      rover,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `Unable to get values for ${rover}. Error: Unknown control: X`
    );
    expect(result).toBe('unknown');
  });

  it('should return correct coordinates', () => {
    const result = calculatePosition({
      plateauSize,
      roverInput,
      rover,
    });

    expect(result).toBe('1 3 N');
  });
});
