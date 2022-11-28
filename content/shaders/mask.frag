precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

uniform vec2 texOffset;
uniform vec2 mouse;

// holds the 3x3 kernel
uniform float mask[9];

uniform bool apply_mask;
uniform bool luma;
uniform bool roi;
uniform bool magnifier;

// Magnifier zoom
const float Zoom = 2.0;
// Radius for magnifier/region of interest
const float actionRadius = 0.2;

float lumaFunction(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

vec4 magnifiedTexture(sampler2D currTexture, vec2 point){
  // Returns the color at the point after applying the maginifier operations if needed
  if(magnifier && distance(point,mouse) <= 0.2){
    vec2 centerVector = point-mouse;
    centerVector = (1.0/Zoom) * centerVector;
    return texture2D(currTexture,mouse+centerVector);
  }
  return texture2D(currTexture,point);
}

void main() {
  if(apply_mask && (roi == false || distance(texcoords2,mouse) <= 0.2)){
    // 1. Use offset to move along texture space.
    // In this case to find the texcoords of the texel neighbours.
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
    // origin (current fragment texcoords)
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0] = magnifiedTexture(texture, tc0);
    rgba[1] = magnifiedTexture(texture, tc1);
    rgba[2] = magnifiedTexture(texture, tc2);
    rgba[3] = magnifiedTexture(texture, tc3);
    rgba[4] = magnifiedTexture(texture, tc4);
    rgba[5] = magnifiedTexture(texture, tc5);
    rgba[6] = magnifiedTexture(texture, tc6);
    rgba[7] = magnifiedTexture(texture, tc7);
    rgba[8] = magnifiedTexture(texture, tc8);

    // 3. Apply convolution kernel
    vec4 convolution = vec4(0.0,0.0,0.0,0.0);
    for (int i = 0; i < 9; i++) {
      convolution += rgba[i]*mask[i];
    }

    gl_FragColor = convolution;
  }else{
    gl_FragColor = magnifiedTexture(texture, texcoords2);
  }
  // Apply Luma
  if(luma){
    gl_FragColor = vec4((vec3(lumaFunction(gl_FragColor.rgb))), 1.0);
  }
}