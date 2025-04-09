// 특수문자 대체 및 복원 함수
const replaceSpecialChars = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/'/g, 'ˮ').replace(/"/g, '˝').replace(/;/g, '⁏').replace(/\\/g, '∖').replace(/--/g, '—');
};

const restoreSpecialChars = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.replace(/ˮ/g, "'").replace(/˝/g, '"').replace(/⁏/g, ';').replace(/∖/g, '\\').replace(/—/g, '--');
};

const clientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress;

  // IPv6 localhost (::1) → IPv4 (127.0.0.1)로 변환 처리
  if (ip === '::1' || ip === '127.0.0.1') ip = '공용 IP 아님 (로컬 접근)';

  return ip;
};


module.exports = { replaceSpecialChars, restoreSpecialChars, clientIp };