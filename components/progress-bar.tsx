interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso do diagnóstico"
    >
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
