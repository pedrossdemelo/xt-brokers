import { useState } from "react";

function writeInitialState<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));

  return value;
}

export default function useLocalStorage<T>(key: string, initialState: T) {
  const [storedValue, setStoredValue] = useState<T>(
    JSON.parse(localStorage.getItem(key)!) ??
      writeInitialState(key, initialState),
  );

  const setValue: typeof setStoredValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(
      key,
      JSON.stringify(
        typeof value === "function" ? (value as Function)(storedValue) : value,
      ),
    );
  };

  return [storedValue as T, setValue] as const;
}
