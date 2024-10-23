export type SVGComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

export type WithClassName<T> = Readonly<T & { className?: string }>;
