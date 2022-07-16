import { useState } from "react";

function writeInitialState<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export default function useLocalStorage<T>(key: string, initialState: T) {
  const [storedValue, setStoredValue] = useState(
    JSON.parse(localStorage.getItem(key)!) ??
      writeInitialState(key, initialState)
  );

  function setValue(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  return [storedValue, setValue] as const;
}
