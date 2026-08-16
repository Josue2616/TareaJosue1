precision mediump float;

uniform float uTime;
uniform float uBrightness;

varying vec2 vTexCoord;

void main() {

    float pulse = sin(uTime * 0.8) * 0.5 + 0.5;

    vec3 nightColor = vec3(
        0.10,
        0.05,
        0.20
    );

    vec3 dayColor = vec3(
        0.95,
        0.75,
        0.35
    );

    vec3 color = mix(
        nightColor,
        dayColor,
        uBrightness
    );

    float opacity = mix(
        0.10 + pulse * 0.03,
        0.02,
        uBrightness
    );

    gl_FragColor = vec4(
        color,
        opacity
    );

}