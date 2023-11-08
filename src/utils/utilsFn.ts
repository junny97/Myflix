export const makeImagePath = (ImagePath: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${
    format ? format : 'original'
  }/${ImagePath}`;
};
