/**
 * 获取length为size的随机数组
 * @param {*} size
 * @returns
 */
export function getRandomNumberArray(size) {
  const array = [];
  const ratio = getRandomNumber(10, 1);
  for (let i = 0; i < size; i++) {
    array.push(getRandomNumber(size * ratio));
  }
  return array;
}
/**
 * 获取min到max的随机数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function getRandomNumber(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
