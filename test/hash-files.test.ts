import {createHash} from 'crypto'

describe('hash-files', ()=>{
  const hash = createHash('md5');
  test('Should throw error when hash tries to get digest is digested already', ()=>{
    // given
    const a = 'abc'
    const firstDigest = hash.update(a).digest()

    // when
    const secondDigest = ()=>hash.update(a).digest()

    // then
    expect(()=> secondDigest()).toThrowError('Digest already called')
  })
})