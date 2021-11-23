export const getWorkTypeName = (code) => {
  const map = {
    'YJ': '土建',
    'QG': '钳工',
    'LZ': '冷作',
    'LW': '劳务',
    'FZ': '辅助',
    'YB': '仪表',
    'HJ': '焊接',
    'WD': '微电',
    'DG': '电工',
    'QZ': '起重',
    'GD': '管道',
    'TJ': '土建',
    'QT': '其他工种'
  };
  return map[code];
}
export default {
  getWorkTypeName,
}