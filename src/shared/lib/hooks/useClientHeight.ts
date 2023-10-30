import { useCallback, useEffect, useState } from "react";

export const useClientHeight = (): number => {
  const [currentClientHeight, setCurrentClientHeight] = useState(0);

  const updateCurrentHeight = useCallback(() => {
    setCurrentClientHeight(document.documentElement.clientHeight);
  }, [setCurrentClientHeight]);

  useEffect(() => {
    window.addEventListener("resize", updateCurrentHeight);
    return () => window.removeEventListener("resize", updateCurrentHeight);
    // необходимо выполнить этот эффект только один раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCurrentHeight();
    // необходимо выполнить этот эффект только один раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentClientHeight;
};
