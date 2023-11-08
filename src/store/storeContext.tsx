import { lkStore } from '../store/lkStore'
import React, { createContext, FC, ReactNode } from 'react'

export const StoreContext = createContext(lkStore)

type StoreProviderProps = {
  children: ReactNode
}
export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <StoreContext.Provider value={lkStore}>{children}</StoreContext.Provider>
}
