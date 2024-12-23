'use client';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';


export function SWRConfigProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }}
    >
      {children}
    </SWRConfig>
  );
}

