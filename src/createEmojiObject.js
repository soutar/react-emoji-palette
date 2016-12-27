import fromCodePoint from './fromCodePoint';

export default ({ codePoints, data, url }) => {
  const native = codePoints.split('-').map(fromCodePoint).join('');
  return ({
    id: codePoints,
    title: data[0],
    tags: data[1],
    url,
    native
  });
};
