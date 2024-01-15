import { useEffect } from 'react';
import { config } from '@/config';

export function useDocumentTitle() {
  useEffect(() => {
    document.title = config.title;
  }, []);
}
