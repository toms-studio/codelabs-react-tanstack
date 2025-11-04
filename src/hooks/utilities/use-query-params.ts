import { useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export function useQueryParam<T>(paramKey: string, defaultValue?: T): [T, (value: T) => void] {
  const navigate = useNavigate();
  const location = useLocation();

  const currentSearch = (location.search ?? {}) as Record<string, unknown>;

  const getParam = () => {
    const value = currentSearch[paramKey];
    if (value === undefined && defaultValue !== undefined) return defaultValue as T;
    return value as T;
  };

  const queryParamSetter = (value: T) => {
    navigate({
      to: '.',
      replace: true,
      search: (prev: Record<string, unknown>) => {
        const next = { ...prev } as Record<string, unknown>;
        const shouldDelete =
          value === undefined ||
          value === null ||
          (typeof value === 'string' && value === '') ||
          (Array.isArray(value) && value.length === 0);
        if (shouldDelete) {
          delete next[paramKey];
        } else {
          next[paramKey] = value as unknown;
        }
        return next;
      },
    });
  };

  useEffect(() => {
    const isMissing = currentSearch[paramKey] === undefined;
    const defaultIsEmptyArray = Array.isArray(defaultValue) && defaultValue.length === 0;
    if (isMissing && defaultValue !== undefined && !defaultIsEmptyArray) {
      queryParamSetter(defaultValue as T);
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: we want to re-run this effect when the default value changes
  }, [defaultValue, queryParamSetter, paramKey, currentSearch[paramKey]]);

  return [getParam(), queryParamSetter];
}

type QueryParams<T> = {
  [K in keyof T]: T[K];
};

export function useQueryParams<T extends Record<string, unknown>>(defaults: QueryParams<T>) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentSearch = (location.search ?? {}) as Record<string, unknown>;

  // Extract only relevant query params based on the provided default object
  const filteredParams = Object.keys(defaults).reduce(
    (acc, key) => {
      const value = currentSearch[key];
      if (value !== undefined) {
        acc[key as keyof T] = value as T[keyof T];
      } else {
        acc[key as keyof T] = defaults[key as keyof T];
      }
      return acc;
    },
    {} as Partial<T>
  ) as QueryParams<T>;

  // Function to update only relevant query params
  const querySetter = (newValues: Partial<T>) => {
    navigate({
      to: '.',
      replace: true,
      search: (prev: Record<string, unknown>) => {
        const next = { ...prev } as Record<string, unknown>;
        Object.entries(newValues).forEach(([key, value]) => {
          const shouldDelete =
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value === '') ||
            (Array.isArray(value) && value.length === 0);
          if (shouldDelete) {
            delete next[key];
          } else {
            next[key] = value as unknown;
          }
        });
        return next;
      },
    });
  };

  // Initialize missing defaults in the URL (skip empty arrays/empty strings)
  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to re-run this effect when the defaults change
  useEffect(() => {
    const missingDefaults: Partial<T> = {};
    Object.keys(defaults).forEach((key) => {
      const current = currentSearch[key];
      const def = defaults[key as keyof T];
      const defIsEmpty =
        def === undefined ||
        def === null ||
        (typeof def === 'string' && def === '') ||
        (Array.isArray(def) && def.length === 0);
      if (current === undefined && !defIsEmpty) {
        missingDefaults[key as keyof T] = def as T[keyof T];
      }
    });

    if (Object.keys(missingDefaults).length > 0) {
      querySetter(missingDefaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaults]);

  return [filteredParams, querySetter] as const;
}
