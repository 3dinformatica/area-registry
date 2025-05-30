import { useState } from "react";
import { useEffect } from "react";

// Custom hook for debouncing
export function useDebounce<T>(value: T, debounceTime?: number): T {
  const delay = debounceTime ?? 350;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
