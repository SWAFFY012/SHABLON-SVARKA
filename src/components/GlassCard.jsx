export function GlassCard({ children, className = '', ...props }) {
  return <div data-slot="glass-card" className={`glass-card ${className}`} {...props}>{children}</div>
}

export function GlassCardHeader({ children, className = '' }) {
  return <div className={`glass-card-header ${className}`}>{children}</div>
}

export function GlassCardContent({ children, className = '' }) {
  return <div className={`glass-card-content ${className}`}>{children}</div>
}

export function GlassCardFooter({ children, className = '' }) {
  return <div className={`glass-card-footer ${className}`}>{children}</div>
}
