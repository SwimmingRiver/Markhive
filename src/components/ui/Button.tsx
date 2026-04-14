import { cn } from "@/lib/utils";

interface ButtonProps extends React.BlockquoteHTMLAttributes<HTMLButtonElement> {
    size?:"sm"|"md"|"lg";
    variant?:"primary"|"secondary"|"ghost";
    text?:string;
    className?:string;
}

export default function Button({size="md",variant="primary",text,className,...props}:ButtonProps){
    const variants={
        primary:   'bg-indigo-500 text-white hover:bg-indigo-600',
        secondary: 'bg-white text-indigo-500 border border-indigo-500',
        ghost:'text-gray-600 hover:bg-gray-100',
    }

    const sizes={
         sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    }

    return (
        <button 
          className={cn(
        'inline-flex items-center rounded-md font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
        >{text}</button>
    )
}