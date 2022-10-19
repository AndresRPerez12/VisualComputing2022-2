precision mediump float;

uniform float near;
uniform float far;

float map(float value, float start1, float stop1, float start2, float stop2) {
  return start2 + (value - start1) * (stop2 - start2) / (stop1 - start1);
}

void main() {
  float z_n = map(gl_FragCoord.z, 0.0, 1.0, -1.0, 1.0);
  float z_e = (2.0 * near * far) / (z_n * (far - near) - far - near);
  float depth = map(z_e, -near, -far, 0.0, 1.0);
  gl_FragColor = vec4(vec3(depth), 1.0);
}