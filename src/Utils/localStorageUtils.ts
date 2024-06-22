export function getFromLocalStorage(key: string, defaultValue: any = null): any {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}
