import { ticks } from 'd3-array';

import { copy, transformer } from 'd3-scale/src/continuous.js';
import { initRange } from 'd3-scale/src/init.js';
import { linearish } from 'd3-scale/src/linear.js';
import nice from 'd3-scale/src/nice.js';

export function powm1(base) {
  if (base === Math.E) return Math.expm1;

  return x => Math.pow(base, x) - 1;
}

export function log1p(base) {
  if (base === Math.E) return Math.log1p;
  if (base === 10) return x => Math.log10(x + 1);
  if (base === 2) return x => Math.log2(x + 1);

  base = Math.log(base);

  return x => Math.log1p(x) / base;
}

function transformSymLog(fn, c) {
  return function (x) {
    return Math.sign(x) * fn(Math.abs(x / c));
  };
}

function transformSymPow(fn, c) {
  return function (x) {
    return Math.sign(x) * fn(Math.abs(x)) * c;
  };
}

export function symlogish(transform) {
  let constant = 1,
    base = Math.E,
    pows = transformSymPow(powm1(base), constant),
    logs = transformSymLog(log1p(base), constant);

  const scale = linearish(transform(logs, pows));
  const domain = scale.domain;

  function rescale() {
    pows = transformSymPow(powm1(base), constant);
    logs = transformSymLog(log1p(base), constant);
    transform(logs, pows);

    return scale;
  }

  scale.base = function (_) {
    return arguments.length ? ((base = +_), rescale()) : base;
  };

  scale.constant = function (_) {
    return arguments.length ? ((constant = +_), rescale()) : constant;
  };

  scale.ticks = function (count) {
    const d = domain(),
      u = d[0],
      v = d[d.length - 1],
      n = +count || 10;

    let i = logs(u - Math.sign(u) * constant),
      j = logs(v - Math.sign(v) * constant);

    if (j < i) [i, j] = [j, i];

    const l = j - i;

    if (base % 1 === 0 && l < n) {
      i = Math.floor(i);
      j = Math.ceil(j);

      const z = [],
        inBetween = Math.floor(n / l);

      z.push(pows(i) + Math.sign(i || 1) * constant);

      for (; i < j; ++i) {
        const a = pows(i) + Math.sign(i || 1) * constant;
        const zb = ticks(0, base, inBetween);
        for (let k = 1; k < zb.length; ++k) {
          const t = zb[k] * a;
          z.push(t);
        }
      }

      return z;
    }

    return ticks(i, j, n).map(t => pows(t) + Math.sign(t) * constant);
  };

  scale.nice = function () {
    return domain(
      nice(domain(), {
        floor: x =>
          pows(Math.floor(logs(x - Math.sign(x) * constant))) +
          Math.sign(x) * constant,
        ceil: x =>
          pows(Math.ceil(logs(x - Math.sign(x) * constant))) +
          Math.sign(x) * constant
      })
    );
  };

  return scale;
}

export default function symlog() {
  var scale = symlogish(transformer());

  scale.copy = function () {
    return copy(scale, symlog()).base(scale.base()).constant(scale.constant());
  };

  return initRange.apply(scale, arguments);
}
