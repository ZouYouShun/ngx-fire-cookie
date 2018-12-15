export function getCookie(cname: string, cookieString: string) {
  const name = cname + '=';
  const cArr = cookieString.split(';');

  for (let i = 0; i < cArr.length; i++) {
    const c = cArr[i].trim();
    if (c.indexOf(name) === 0) {
      const str = c.substring(name.length, c.length);
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
  }
  return '';
}
