/* Renders an SVG authored as a markup string (icon sets, partner logos) as a real <svg>
   element: the outer tag's attributes become props, the inner markup is passed through. */

const KEEP = /^(aria-|data-)/;
const toProp = name => (name === 'class' ? 'className'
  : KEEP.test(name) || name === 'viewBox' ? name
  : name.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase()));

const cache = new Map();

function parse(markup) {
  if (cache.has(markup)) return cache.get(markup);
  const m = markup.trim().match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
  if (!m) throw new Error('RawSvg: markup must be a single <svg> element');
  const props = {};
  for (const [, k, v] of m[1].matchAll(/([\w:-]+)="([^"]*)"/g)) props[toProp(k)] = v;
  const parsed = { props, inner: m[2] };
  cache.set(markup, parsed);
  return parsed;
}

export default function RawSvg({ markup, ...rest }) {
  const { props, inner } = parse(markup);
  return <svg {...props} {...rest} dangerouslySetInnerHTML={{ __html: inner }} />;
}
