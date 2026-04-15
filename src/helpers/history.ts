const replace = (args: { pathname?: string; params: URLSearchParams }) => {
  const pathname = args.pathname ?? window.location.pathname;
  const url = `${pathname}${args.params.toString() ? `?${args.params.toString()}` : ""}`;
  window.history.replaceState(null, "", url);
};

export const History = {
  replace,
} as const;
