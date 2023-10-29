declare module '@bruitt/classnames' {
  interface Styles {
    readonly [key: string]: string
  }
  type SXArg = string | string[] | { [key: string]: any } | undefined
  type SX = (...args: SXArg[]) => string
  export let withStyles: (styles: Styles) => SX
}

// declare module '*.svg' {
//   let content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
//   export default content
// }

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const content: string

  export { ReactComponent }
  export default content
}
