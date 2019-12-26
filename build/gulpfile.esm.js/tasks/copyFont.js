import path from 'path';
import { src, dest } from 'gulp';

export default (basePath, dst) => function copyFont() {
  return src(path.join(basePath, '**/fonts/*.@(eot|svg|ttf|woff)'), { base: basePath }).pipe(
    dest(dst)
  );
};
