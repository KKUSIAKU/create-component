import flows from '../src/etc/flowContent';
import phrasing from '../src/etc/phrasingContent';
import sections from '../src/etc/sectioningContent';
import interactions from '../src/etc/interactiveContent';
import embed from '../src/etc/embededContent';

const matchKeyValue = obj =>  Object.keys(obj).forEach(tag => expect(obj[tag]).toBe(tag))

describe('Check that map registry is correctly formed', () => {

  matchKeyValue(flows)
  matchKeyValue(phrasing)
  matchKeyValue(sections)
  matchKeyValue(interactions)
  matchKeyValue(embed)


})