import type { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-blue-700 bg-blue-700 text-white hover:bg-blue-800 focus-visible:outline-blue-600',
  secondary:
    'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:outline-blue-600',
  danger:
    'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700 focus-visible:outline-red-600'
};

function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={`${styles.button} inline-flex min-h-9 items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-65 ${variantClasses[variant]} ${className}`}
    />
  );
}

export default Button;
