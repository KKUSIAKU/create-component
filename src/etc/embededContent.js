const EmbedTags =  {
  audio: 'audio',
  canvas: 'canvas',
  embed: 'embed',
  iframe: 'iframe',
  img: 'img',
  math: 'math',
  object: 'object',
  picture: 'picture',
  svg: 'svg',
  video: 'video'
}
export default EmbedTags;
export const isEmbedTagName  = tagName => Object.keys(EmbedTags).includes(tagName)