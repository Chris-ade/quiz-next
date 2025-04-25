'use client';

import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/AuthContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SnackbarProvider>
      <AuthProvider>{children}</AuthProvider>
    </SnackbarProvider>
  );
}