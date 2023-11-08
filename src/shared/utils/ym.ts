declare let ym: any

export const ymTarget = (target: string) => {
  if (process.env.NEXT_PUBLIC_STONE_API_URL !== 'https://stone.ru') return

  if (ym) {
    ym(process.env.NEXT_PUBLIC_YM_COUNTER, 'reachGoal', target)
  }
}
