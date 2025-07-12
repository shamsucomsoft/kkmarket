import { useState, useCallback, useEffect } from "react";
import { useToast } from "../components/ui/toast-provider";

interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useRequest = <T>(
  fn: () => Promise<T>,
  { auto = true } = { auto: true }
) => {
  const { addToast } = useToast();
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: auto,
    error: null,
  });

  const run = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (err: any) {
      const message = err?.message || "Request failed";
      setState({ data: null, loading: false, error: message });
      addToast(message, "error");
      throw err;
    }
  }, [fn, addToast]);

  useEffect(() => {
    if (auto) {
      run();
    }
  }, [auto, run]);

  return { ...state, run };
};
