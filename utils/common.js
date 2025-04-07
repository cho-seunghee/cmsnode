// 특수문자 대체 및 복원 함수
const replaceSpecialChars = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/'/g, 'ˮ').replace(/"/g, '˝').replace(/;/g, '⁏').replace(/\\/g, '∖').replace(/--/g, '—');
};

const restoreSpecialChars = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/ˮ/g, "'").replace(/˝/g, '"').replace(/⁏/g, ';').replace(/∖/g, '\\').replace(/—/g, '--');
};


module.exports = { replaceSpecialChars, restoreSpecialChars };