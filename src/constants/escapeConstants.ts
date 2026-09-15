export const BASE_ESCAPE_CHARS = ['n'] as const
export const RESERVED_ESCAPE_CHARS = ['\\'] as const
export const ESCAPE_CHARS = [...BASE_ESCAPE_CHARS, ...RESERVED_ESCAPE_CHARS] as const
