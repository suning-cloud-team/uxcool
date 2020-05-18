
export default function createFile(suffix) {
  const name = `${new Date().getTime()}.${suffix}`;
  return new File([], `./file/${name}`);
}
