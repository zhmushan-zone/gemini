import test from 'ava'

const fn = async () => {
  return Promise.resolve('foo')
}

test(async (t) => {
  t.is(await fn(), 'foo')
})
