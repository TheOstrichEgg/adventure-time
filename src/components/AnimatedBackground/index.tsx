import { useEffect, useRef } from 'react'
import type { Category } from '../../types'

interface Props {
  categories?: Category[]
}

const VERT = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG = `
  precision mediump float;
  uniform vec2 u_res;
  uniform float u_time;
  uniform vec3 u_colors[6];
  uniform vec2 u_centers[6];
  uniform float u_weights[6];
  uniform vec3 u_bg;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;
    vec3 col = u_bg;
    for (int i = 0; i < 6; i++) {
      float d = distance(uv, u_centers[i]);
      float s = exp(-d * d * 3.5) * 0.6 * u_weights[i];
      col = mix(col, u_colors[i], s);
    }
    gl_FragColor = vec4(col, 1.0);
  }
`

const FALLBACK_COLORS = ['#818cf8', '#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fb923c']

function hexToVec3(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return [0.5, 0.5, 0.5]
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ]
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function AnimatedBackground({ categories }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uColors = gl.getUniformLocation(prog, 'u_colors')
    const uCenters = gl.getUniformLocation(prog, 'u_centers')
    const uWeights = gl.getUniformLocation(prog, 'u_weights')
    const uBg = gl.getUniformLocation(prog, 'u_bg')

    const hexList = categories?.length
      ? categories.slice(0, 6).map((c) => c.color)
      : FALLBACK_COLORS.slice(0, 6)

    const colorFlat = new Float32Array(18)
    hexList.forEach((hex, i) => {
      const [r, g, b] = hexToVec3(hex)
      // lighten to make blobs softer
      colorFlat[i * 3] = r * 0.7 + 0.3
      colorFlat[i * 3 + 1] = g * 0.7 + 0.3
      colorFlat[i * 3 + 2] = b * 0.7 + 0.3
    })

    const weights = new Float32Array(6).fill(0)
    hexList.forEach((_, i) => { weights[i] = 1.0 })

    const blobs = Array.from({ length: 6 }, (_, i) => ({
      speedX: 0.08 + (i % 3) * 0.04,
      speedY: 0.06 + (i % 2) * 0.05,
      phase: (i / 6) * Math.PI * 2,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    let animId: number

    const render = (ms: number) => {
      const t = ms / 1000
      const isDark = document.documentElement.classList.contains('dark')
      const bg = isDark
        ? new Float32Array([0.07, 0.07, 0.10])
        : new Float32Array([0.97, 0.97, 1.0])

      const centers = new Float32Array(12)
      blobs.forEach((b, i) => {
        centers[i * 2] = 0.5 + Math.sin(t * b.speedX + b.phase) * 0.45
        centers[i * 2 + 1] = 0.5 + Math.cos(t * b.speedY + b.phase * 1.4) * 0.42
      })

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform3fv(uColors, colorFlat)
      gl.uniform2fv(uCenters, centers)
      gl.uniform1fv(uWeights, weights)
      gl.uniform3fv(uBg, bg)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [categories])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />
}
