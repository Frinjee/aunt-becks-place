type EditorialLineProps = {
  readonly className?: string;
};

export function EditorialLine({ className = "" }: EditorialLineProps) {
  return <div className={`editorial-line ${className}`} aria-hidden="true" />;
}
