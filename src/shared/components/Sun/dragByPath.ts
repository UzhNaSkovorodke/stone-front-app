const DEG = 180 / Math.PI

export const closestPoint = (
  pathNode: SVGPathElement,
  pathLength: number,
  point: gsap.Point2D
): { point: gsap.Point2D; rotation: number; distance: number } => {
  let precision = 8,
    best,
    bestLength,
    bestDistance = Infinity

  // linear scan for coarse approximation
  for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2((scan = pathNode.getPointAtLength(scanLength)))) < bestDistance) {
      ;(best = scan), (bestLength = scanLength), (bestDistance = scanDistance)
    }
  }

  // binary search for precise estimate
  precision /= 2
  while (precision > 0.5) {
    let before, after, beforeLength, afterLength, beforeDistance, afterDistance
    if (
      // @ts-ignore
      (beforeLength = bestLength - precision) >= 0 &&
      (beforeDistance = distance2((before = pathNode.getPointAtLength(beforeLength)))) <
        bestDistance
    ) {
      ;(best = before), (bestLength = beforeLength), (bestDistance = beforeDistance)
    } else if (
      // @ts-ignore
      (afterLength = bestLength + precision) <= pathLength &&
      (afterDistance = distance2((after = pathNode.getPointAtLength(afterLength)))) < bestDistance
    ) {
      ;(best = after), (bestLength = afterLength), (bestDistance = afterDistance)
    } else {
      precision /= 2
    }
  }

  // @ts-ignore
  const len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1)
  const rotation = getRotation(best as gsap.Point2D, pathNode.getPointAtLength(len2))

  return {
    point: best as gsap.Point2D,
    rotation: rotation * DEG,
    distance: Math.sqrt(bestDistance),
  }

  function distance2(p: gsap.Point2D) {
    const dx = p.x - point.x,
      dy = p.y - point.y
    return dx * dx + dy * dy
  }
}

export const getRotation = (p1: gsap.Point2D, p2: gsap.Point2D) => {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  return Math.atan2(dy, dx)
}
