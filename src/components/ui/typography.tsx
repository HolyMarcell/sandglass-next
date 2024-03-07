import * as React from 'react';
import { cn } from '~/lib/utils';

type H1Props = React.HTMLAttributes<HTMLHeadingElement>;

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(className, 'py-4 text-3xl font-bold')}
        ref={ref}
        {...props}
      />
    )
  }
)
H1.displayName = "H1"


// -------

type H2Props = React.HTMLAttributes<HTMLHeadingElement>;

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        className={cn(className, 'py-4 text-2xl font-bold')}
        ref={ref}
        {...props}
      />
    )
  }
)
H2.displayName = "H2"


// -------

type H3Props = React.HTMLAttributes<HTMLHeadingElement>;

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(className, 'py-4 text-xl font-semibold')}
        ref={ref}
        {...props}
      />
    )
  }
)
H3.displayName = "H3"

// -------

type H4Props = React.HTMLAttributes<HTMLHeadingElement>;

const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        className={cn('py-2 text-lg font-semibold', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
H4.displayName = "H4"


// -------

type PProps = React.HTMLAttributes<HTMLHeadingElement>;

const P = React.forwardRef<HTMLHeadingElement, PProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(className, 'py-3')}
        ref={ref}
        {...props}
      />
    )
  }
)
P.displayName = "P"


// -------

type StrongProps = React.HTMLAttributes<HTMLHeadingElement>;

const Strong = React.forwardRef<HTMLHeadingElement, StrongProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn(className, 'font-bold')}
        ref={ref}
        {...props}
      />
    )
  }
)
Strong.displayName = "Strong"

// -------

type OlProps = React.HTMLAttributes<HTMLOListElement>;

const Ol = React.forwardRef<HTMLOListElement, OlProps>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        className={cn(className, 'list-decimal')}
        ref={ref}
        {...props}
      />
    )
  }
)
Ol.displayName = "Ol"


// -------

type LiProps = React.HTMLAttributes<HTMLLIElement>;

const Li = React.forwardRef<HTMLLIElement, LiProps>(
  ({ className, ...props }, ref) => {
    return (
      <li
        className={cn(className, 'py-2')}
        ref={ref}
        {...props}
      />
    )
  }
)
Li.displayName = "Li"




export {H1, H2, H3, H4, P, Strong, Ol, Li}
