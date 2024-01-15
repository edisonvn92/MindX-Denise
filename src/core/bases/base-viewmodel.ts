import { useToast } from '@mx/ui';
import { useState } from 'react';

export function useBaseViewModel() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<Error>();
  const toast = useToast();

  async function catchAction(action: () => Promise<void>) {
    try {
      setLoading(true);
      await action();
      setSuccess(true);
    } catch (err) {
      setError(err as Error);
      toast.addToast({ status: 'error', header: (err as Error).message });
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return {
    catchAction,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
  };
}
