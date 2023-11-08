import { useCallback, useEffect, useState } from "react";

export const useClientWidth = (): number => {
  const [currentClientWidth, setCurrentClientWidth] = useState(0);

  const updateCurrentWidth = useCallback(() => {
    setCurrentClientWidth(window.innerWidth);
  }, [setCurrentClientWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateCurrentWidth);
    return () => window.removeEventListener("resize", updateCurrentWidth);
    // необходимо выполнить этот эффект только один раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCurrentWidth();
    // необходимо выполнить этот эффект только один раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentClientWidth;
};
