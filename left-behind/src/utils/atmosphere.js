import * as THREE from 'three'

// Rim-glow shell: render on a slightly larger back-faced sphere with additive blending.
export function atmosphereMaterial(color, k = 1) {
  return new THREE.ShaderMaterial({
    uniforms: { c: { value: new THREE.Color(color) }, k: { value: k } },
    vertexShader: 'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'uniform vec3 c;uniform float k;varying vec3 vN;void main(){float i=pow(max(0.72-dot(vN,vec3(0.,0.,1.)),0.),3.);gl_FragColor=vec4(c*i*k,i*k);}',
    side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
  })
}
