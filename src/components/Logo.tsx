type Props = {
  className?: string
  variant?: 'full' | 'mark'
}

export function Logo({ className = 'h-7', variant = 'full' }: Props) {
  const file = variant === 'mark' ? '/logo-mark.svg' : '/logo.svg'
  return <img src={file} alt="Fixconnexion" className={className} />
}
