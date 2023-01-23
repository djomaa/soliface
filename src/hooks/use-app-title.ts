import { useEffect, useRef, useState } from 'react';

import { AppName } from 'constants/common';

let id = 0;
export const useAppTitle = (part?: string) => {
  const st = useState(id++);
  const prevTitleRef = useRef(document.title);

  useEffect(() => {
    const title = part ? `${AppName} | ${part}` : AppName;
    document.title = title;
    console.log("[title]", st[0], title)
    return () => {
      document.title = prevTitleRef.current;
    };
  }, [part]);


}
