import { RegExpConfidence } from '../src/RegExpConfidence';

it('matching regex completely with no wildcards', () => {
  const regex = new RegExpConfidence(/aa/);
  expect(regex.testc('aabb')).toStrictEqual({ result: true, confidence: 1.0 });
});

it('matching regex completely with wildcards', () => {
  const regex = new RegExpConfidence(/\w/);
  expect(regex.testc('word')).toStrictEqual({ result: true, confidence: 0.9 });
});