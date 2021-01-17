/* global  it, describe */
const assert = require('assert')
const { Photo } = require('../src/repository')
describe('Photo', function () {
  describe('Object structure', function () {
    it('should has the id field bisides the _id', function () {
      const photo = new Photo({
        _id: '6002004c89b3de44a43aacfa',
        album: 'food',
        name: 'background-2277_1280.webp',
        path: '/albums/food/background-2277_1280.webp',
        raw: 'http://localhost:8888/photos/food/background-2277_1280.webp',
        __v: 0
      })

      assert.strictEqual(photo.id, '6002004c89b3de44a43aacfa')
    })
  })
})
