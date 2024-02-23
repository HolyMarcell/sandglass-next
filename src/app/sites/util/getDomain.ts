export const getDomain = (str: string) => {
  try {
    const u = new URL(str);
    return u.host;
  } catch (_) {
    return str;
  }
}
