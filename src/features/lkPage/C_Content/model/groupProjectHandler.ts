import { ILot, SectionsType } from 'src/store/types/lkStore.interface'

//убрать логику ближе где используется
function getAllIds<T extends { lot: ILot }[]>(lots: T): number[] {
  return lots.reduce((acc: number[], elem: { lot: ILot }) => {
    acc.push(elem.lot.id)
    return acc
  }, [])
}

function getProjectsName<T extends { lot: ILot }[]>(lots: T): string[] {
  return lots.reduce((acc: string[], elem) => {
    if (!acc.includes(elem.lot.project.project)) acc.push(elem.lot.project.project)
    return acc
  }, [])
}

function getGroupForType<T extends { lot: ILot }[]>(lots: T, type: string): { lot: ILot }[] {
  return lots.reduce((acc: { lot: ILot }[], elem) => {
    if (type === 'DOM') {
      if (elem.lot.type !== null && elem.lot.direction === 1) acc.push(elem)
    } else if (type === 'OFFICE') {
      if (elem.lot.type !== null && elem.lot.direction === 2) acc.push(elem)
    }
    return acc
  }, [])
}

function getGroupArr<T extends { lot: ILot }[]>(
  projectNames: string[],
  storeContext: T
): SectionsType[] {
  return projectNames.reduce((acc: SectionsType[], elem: string) => {
    const lotsOfProject = storeContext.filter((obj) => obj.lot.project.project === elem)
    if (lotsOfProject.length) acc.push(lotsOfProject)
    return acc
  }, [])
}

export { getProjectsName, getGroupArr, getGroupForType, getAllIds }
