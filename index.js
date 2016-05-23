'use strict';

module.exports = class TextReader {

  /**
   * @constructor
   * @param {string} text
   * @param {string} [eol] end on line, default is '\r\n'
   */
  constructor(text, eol) {
    /**
     * @type {string}
     * @private
     */
    this._data = text;
    /**
     * @type {number}
     * @private
     */
    this._pos = 0;
    /**
     * @type {string}
     * @private
     */
    this._eol = eol || '\r\n';
  }

  /**
   * Get current position.
   * @returns {number}
   */
  get position() {
    return this._pos;
  }

  /**
   * Get the length of unread char sequence.
   * @returns {number}
   */
  get available() {
    return this._pos < this._data.length
      ? this._data.length - this._pos
      : 0;
  }

  /**
   * Get the next chars in sequence.
   * @param {number} [count] - default is 1
   * @returns {string}
   */
  peek(count) {
    count = count || 1;
    return this._data.substring(this._pos, this._pos + count);
  }

  /**
   * Skip the next chars in sequence.
   * @param {number} [count] - default is 1
   * @return {TextReader}
   */
  skip(count) {
    count = count || 1;
    this._pos += count;
    return this;
  }

  /**
   * Reset position of reader.
   * @param {number} position
   * @return {TextReader}
   */
  seek(position) {
    this._pos = position;
    return this;
  }

  /**
   * Consume chars in sequence.
   * @param {number} [count] - default is 1
   * @returns {string}
   */
  read(count) {
    count = count || 1;
    let chunk = this._data.substring(this._pos, this._pos + count);
    this._pos += chunk.length;
    return chunk;
  }

  /**
   * Consume chars in sequence until meets the end of line.
   * @returns {string}
   */
  readLine() {
    let nextPos = this._data.indexOf(this._eol, this._pos);
    if (nextPos < 0) return this.readToEnd();
    let chunk = this._data.substring(this._pos, nextPos);
    this._pos = this._pos + chunk.length + this._eol.length;
    return chunk;
  }

  /**
   * Consume all remained chars.
   * @returns {string}
   */
  readToEnd() {
    let chunk = this._data.substring(this._pos);
    this._pos += chunk.length;
    return chunk;
  }

  /**
   * Create a new reader.
   * @param {string} text
   * @returns {TextReader}
   */
  static create(text) {
    return new TextReader(text);
  }

};
