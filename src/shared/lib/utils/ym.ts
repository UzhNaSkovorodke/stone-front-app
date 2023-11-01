declare var ym: any

export const ymTarget = (target: string) => {
  if (process.env.NEXT_PUBLIC_STONE_API_URL !== 'https://stone.ru') return
  // TODO убрать NEXT PUBLIC т.к https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
  if (ym) {
    ym(process.env.NEXT_PUBLIC_YM_COUNTER, 'reachGoal', target)
  }
}
