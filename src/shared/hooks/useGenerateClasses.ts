export const useGenerateClasses = (
  classesModule: { [key: string]: any },
  classNames: string[]
): string => {
  let classGroup = ''

  classNames.forEach((className: string) => {
    if (classesModule[className]) {
      classGroup = classGroup + ' ' + classesModule[className]
    }
  })

  return classGroup
}
