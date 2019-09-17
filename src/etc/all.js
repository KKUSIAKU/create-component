// source 
// https://www.w3.org/TR/2018/WD-html53-20181018/dom.html#content-models
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-250 -150 1024 288"><script xmlns=""/>
 <style type="text/css">
  @import url(/style/svg-color-scheme.css);
  svg     { font: bold 18px sans-serif; text-anchor: middle; }
  ellipse { fill: #005a9c; stroke: #000000; opacity: 0.67; }
  text    { fill: #ffffff; pointer-events: none; }
  ellipse:hover { stroke-width: 5px; }
  ellipse:not(:hover) + foreignObject { display: none; }
  div { font: 14px sans-serif; }
  h1 { margin: 0 0 0.25em 0; padding: 0; font: 900 27px sans-serif; text-shadow: 0.15em 0.15em 0.2em gray; }
  ul { margin: 0; padding: 0 0 0 1em; }
  li { display: inline; margin: 0; padding: 0; line-height: 1.5; }
  li:not(:last-child):after { content: ', '; }
  span { font: italic 14px sans-serif; }
  code { font: 1em monospace; color: orangered; }
  p { margin: 0.75em 0 0 0; padding: 0 0 0 1em; font: italic 14px sans-serif; }
 </style>
 <g class="a" transform="translate(2, -3)">
  <ellipse rx="244" ry="132"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(-2, 3)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Flow content</h1>
    <ul>
     <li><code>a</code></li>
     <li><code>abbr</code></li>
     <li><code>address</code></li>
     <li><code>area</code>*</li>
     <li><code>article</code></li>
     <li><code>aside</code></li>
     <li><code>audio</code></li>
     <li><code>b</code></li>
     <li><code>bdi</code></li>
     <li><code>bdo</code></li>
     <li><code>blockquote</code></li>
     <li><code>br</code></li>
     <li><code>button</code></li>
     <li><code>canvas</code></li>
     <li><code>cite</code></li>
     <li><code>code</code></li>
     <li><code>data</code></li>
     <li><code>date</code></li>
     <li><code>datalist</code></li>
     <li><code>del</code></li>
     <li><code>details</code></li>
     <li><code>dfn</code></li>
     <li><code>dialog</code></li>
     <li><code>div</code></li>
     <li><code>dl</code></li>
     <li><code>em</code></li>
     <li><code>embed</code></li>
     <li><code>fieldset</code></li>
     <li><code>figure</code></li>
     <li><code>footer</code></li>
     <li><code>form</code></li>
     <li><code>h1</code></li>
     <li><code>h2</code></li>
     <li><code>h3</code></li>
     <li><code>h4</code></li>
     <li><code>h5</code></li>
     <li><code>h6</code></li>
     <li><code>header</code></li>
     <li><code>hr</code></li>
     <li><code>i</code></li>
     <li><code>iframe</code></li>
     <li><code>img</code></li>
     <li><code>input</code></li>
     <li><code>ins</code></li>
     <li><code>kbd</code></li>
     <li><code>label</code></li>
     <li><code>link</code>*</li>
     <li><code>main</code></li>
     <li><code>map</code></li>
     <li><code>mark</code></li>
     <li><code>math</code></li>
     <li><code>menu</code></li>
     <li><code>meta</code>*</li>
     <li><code>meter</code></li>
     <li><code>nav</code></li>
     <li><code>noscript</code></li>
     <li><code>object</code></li>
     <li><code>ol</code></li>
     <li><code>output</code></li>
     <li><code>p</code></li>
     <li><code>picture</code></li>
     <li><code>pre</code></li>
     <li><code>progress</code></li>
     <li><code>q</code></li>
     <li><code>ruby</code></li>
     <li><code>s</code></li>
     <li><code>samp</code></li>
     <li><code>script</code></li>
     <li><code>section</code></li>
     <li><code>select</code></li>
     <li><code>small</code></li>
     <li><code>span</code></li>
     <li><code>strong</code></li>
     <li><code>style</code>*</li>
     <li><code>sub</code></li>
     <li><code>sup</code></li>
     <li><code>svg</code></li>
     <li><code>table</code></li>
     <li><code>template</code></li>
     <li><code>textarea</code></li>
     <li><code>time</code></li>
     <li><code>u</code></li>
     <li><code>ul</code></li>
     <li><code>var</code></li>
     <li><code>video</code></li>
     <li><code>wbr</code></li>
     <li>autonomous custom elements</li>
     <li><span>Text*</span></li>
    </ul>
    <p>* Under certain circumstances (see prose).</p>
   </div>
  </foreignObject>
  <text x="10" y="-94">Flow</text>
 </g>
 <g class="b" transform="translate(127, -48.5)">
  <ellipse rx="75" ry="42.5"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(-127, 48.5)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Heading content</h1>
    <ul>
     <li><code>h1</code></li>
     <li><code>h2</code></li>
     <li><code>h3</code></li>
     <li><code>h4</code></li>
     <li><code>h5</code></li>
     <li><code>h6</code></li>
    </ul>
   </div>
  </foreignObject>
  <text x="2" y="6">Heading</text>
 </g>
 <g class="c" transform="translate(125, 42)">
  <ellipse rx="75" ry="42.5"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(-125, -42)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Sectioning content</h1>
    <ul>
     <li><code>article</code></li>
     <li><code>aside</code></li>
     <li><code>nav</code></li>
     <li><code>section</code></li>
    </ul>
   </div>
  </foreignObject>
  <text x="1" y="5">Sectioning</text>
 </g>
 <g class="d" transform="translate(-113, 78)">
  <ellipse rx="117" ry="47" transform="rotate(-15)"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(113, -78)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Metadata content</h1>
    <ul>
     <li><code>base</code></li>
     <li><code>link</code></li>
     <li><code>meta</code></li>
     <li><code>noscript</code></li>
     <li><code>script</code></li>
     <li><code>style</code></li>
     <li><code>template</code></li>
     <li><code>title</code></li>
    </ul>
   </div>
  </foreignObject>
  <text x="-4" y="8">Metadata</text>
 </g>
 <g class="e" transform="translate(-128, -34)">
  <ellipse rx="94" ry="51"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(128, 34)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Interactive content</h1>
    <ul>
     <li><code>a</code>*</li>
     <li><code>audio</code>*</li>
     <li><code>button</code></li>
     <li><code>details</code></li>
     <li><code>embed</code></li>
     <li><code>iframe</code></li>
     <li><code>img</code>*</li>
     <li><code>input</code>*</li>
     <li><code>label</code></li>
     <li><code>object</code>*</li>
     <li><code>select</code></li>
     <li><code>textarea</code></li>
     <li><code>video</code>*</li>
    </ul>
    <p>* Under certain circumstances.</p>
   </div>
  </foreignObject>
  <text x="-36" y="5">Interactive</text>
 </g>
 <g class="f" transform="translate(-40.5, -5)">
  <ellipse rx="76.5" ry="80"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(40.5, 5)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Phrasing content</h1>
    <ul>
     <li><code>a</code>*</li>
     <li><code>abbr</code></li>
     <li><code>area</code>*</li>
     <li><code>audio</code></li>
     <li><code>b</code></li>
     <li><code>bdi</code></li>
     <li><code>bdo</code></li>
     <li><code>br</code></li>
     <li><code>button</code></li>
     <li><code>canvas</code></li>
     <li><code>cite</code></li>
     <li><code>code</code></li>
     <li><code>data</code></li>
     <li><code>date</code></li>
     <li><code>datalist</code></li>
     <li><code>del</code>*</li>
     <li><code>dfn</code></li>
     <li><code>em</code></li>
     <li><code>embed</code></li>
     <li><code>i</code></li>
     <li><code>iframe</code></li>
     <li><code>img</code></li>
     <li><code>input</code></li>
     <li><code>ins</code>*</li>
     <li><code>kbd</code></li>
     <li><code>label</code></li>
     <li><code>link</code>*</li>
     <li><code>map</code>*</li>
     <li><code>mark</code></li>
     <li><code>math</code></li>
     <li><code>meta</code>*</li>
     <li><code>meter</code></li>
     <li><code>noscript</code></li>
     <li><code>object</code></li>
     <li><code>output</code></li>
     <li><code>picture</code></li>
     <li><code>progress</code></li>
     <li><code>q</code></li>
     <li><code>ruby</code></li>
     <li><code>s</code></li>
     <li><code>samp</code></li>
     <li><code>script</code></li>
     <li><code>select</code></li>
     <li><code>small</code></li>
     <li><code>span</code></li>
     <li><code>strong</code></li>
     <li><code>sub</code></li>
     <li><code>sup</code></li>
     <li><code>svg</code></li>
     <li><code>template</code></li>
     <li><code>textarea</code></li>
     <li><code>time</code></li>
     <li><code>u</code></li>
     <li><code>var</code></li>
     <li><code>video</code></li>
     <li><code>wbr</code></li>
     <li>autonomous custom elements</li>
     <li><span title="text content">Text</span>*</li>
    </ul>
    <p>* Under certain circumstances; see prose.</p>
   </div>
  </foreignObject>
  <text x="0" y="-39.5">Phrasing</text>
 </g>
 <g class="g" transform="translate(-42, -7)">
  <ellipse rx="68" ry="22.5"/>
  <foreignObject x="250" y="-150" width="500" height="288" transform="translate(42, 7)">
   <div xmlns="http://www.w3.org/1999/xhtml">
    <h1>Embedded content</h1>
    <ul>
     <li><code>audio</code></li>
     <li><code>canvas</code></li>
     <li><code>embed</code></li>
     <li><code>iframe</code></li>
     <li><code>img</code></li>
     <li><code>math</code></li>
     <li><code>object</code></li>
     <li><code>picture</code></li>
     <li><code>svg</code></li>
     <li><code>video</code></li>
    </ul>
   </div>
  </foreignObject>
  <text x="0" y="7">Embedded</text>
 </g>
</svg>