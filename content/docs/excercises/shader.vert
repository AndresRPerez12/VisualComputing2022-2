// Precision seems mandatory in webgl
precision highp float;

// 1. Attributes and uniforms sent by p5.js

// Vertex attributes and some uniforms are sent by
// p5.js following these naming conventions:
// https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md

attribute vec3 aPosition;

attribute vec2 aTexCoord;

attribute vec4 aVertexColor;

uniform mat4 uProjectionMatrix;

uniform mat4 uModelViewMatrix;

varying vec4 color4;

varying vec2 texcoords2;

void main() {
  color4 = aVertexColor;
  texcoords2 = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}