import path from 'path';
import { src, dest } from 'gulp';

export default (basePath, dst) => () => src(path.join(basePath, '**/fonts/*.@(eot|svg|ttf|woff)'), { base: basePath }).pipe(dest(dst));
