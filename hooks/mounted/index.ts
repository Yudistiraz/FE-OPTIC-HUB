import { useState, useEffect } from "react";

const useMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export default useMounted;
