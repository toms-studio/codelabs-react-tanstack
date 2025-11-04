import { useState } from 'react';

interface UseDisclosureProps {
  defaultIsOpen?: boolean;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  reset: () => void;
  set: (state: boolean) => void;
}

export function useDisclosure({
  defaultIsOpen = false,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);
  const reset = () => setIsOpen(defaultIsOpen);
  const set = (state: boolean) => setIsOpen(state);

  return { isOpen, open, close, toggle, reset, set };
}
