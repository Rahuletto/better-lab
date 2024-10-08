export function convertLanguageCode(code: string): string {
  const found = Convert.find((a) => a.code === code.toLowerCase());
  if (found) {
    return found.lang;
  } else {
    return code;
  }
}

export const Convert = [
  { code: 'oops', lang: 'cpp' },
  { code: 'daa', lang: 'cpp' },
  { code: 'ds', lang: 'c' },
  { code: 'app', lang: 'java' },
  { code: 'os', lang: 'shell' },
];
