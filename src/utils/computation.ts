/*
    1: ["A", "Q", "Y", "I", "J"]
    2: ["B", "R", "K"]
    3: ["G", "C", "L", "S"]
    4: ["D", "M", "T"]
    5: ["E", "H", "N", "X"]
    6: ["U", "V", "W"]
    7: ["O", "Z"]
    8: ["P", "F"]
*/

export const getArrayOfNumbersFromSplittedName = (splittedName: string[]) => {
  const letterToNumber: Record<string, number> = {
    a: 1, q: 1, y: 1, i: 1, j: 1, '1': 1,
    b: 2, r: 2, k: 2, '2': 2,
    g: 3, c: 3, l: 3, s: 3, '3': 3,
    d: 4, m: 4, t: 4, '4': 4,
    e: 5, h: 5, n: 5, x: 5, '5': 5,
    u: 6, v: 6, w: 6, '6': 6,
    o: 7, z: 7, '7': 7,
    p: 8, f: 8, '8': 8,
    '9': 9,
    '0': 0,
  };

  return splittedName.map(n => letterToNumber[n] || 0);

};

export const getTotal = (value: string | number) => {
  return value
    .toString()
    .split("")
    .map(Number)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};
