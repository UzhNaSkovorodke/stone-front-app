interface IGeneratedTitle {
  title: string,
  opacity: number
}

const formingTitle = (arr: string[], initOpacity: number): IGeneratedTitle[] => {
  let _initOpacity = initOpacity;

  let _generatedTitle: IGeneratedTitle[] = [];

  arr.forEach(title => {
    _generatedTitle.push({
      title: title,
      opacity: _initOpacity
    });

    _initOpacity = Math.ceil((_initOpacity / 2) * 10) / 10;
  })

  return _generatedTitle;
}

export const generateOpacity = (initArr: string[], index: number): IGeneratedTitle[] => {
  let generatedTitle: IGeneratedTitle[] = [];
  let generatedTitleAfter: IGeneratedTitle[] = [];
  let generatedTitleBefore: IGeneratedTitle[] = [];


  if (index === 0) {
    generatedTitle = formingTitle(initArr, 1);
  } else if (index === initArr.length - 1) {
    initArr.reverse();
    generatedTitle = formingTitle(initArr, 1);
    generatedTitle.reverse();
  } else {
    let arrayBefore = initArr.slice(0, index);
    let arrayAfter = initArr.slice(index);

    arrayBefore.reverse();

    generatedTitleBefore = formingTitle(arrayBefore, 0.5);
    generatedTitleAfter = formingTitle(arrayAfter, 1);

    generatedTitleBefore.reverse();

    generatedTitle = generatedTitleBefore.concat(generatedTitleAfter);
  }

  return generatedTitle;
}
