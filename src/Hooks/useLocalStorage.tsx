function useLocalStorage() {
  const getLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
  };

  const setLocalStorage = (key: string, item: any) => {
    localStorage.setItem(key, JSON.stringify(item));
  };

  return { getLocalStorage, setLocalStorage };
}

export default useLocalStorage;
