import { instructions } from './nes/opcode';

console.log('Hello World!');
console.log('Instructions Count', instructions.length);

const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas')
const cxt = canvas.getContext('2d')
cxt.fillStyle = '#ff0000'
cxt.fillRect(0, 0, canvas.width, canvas.height)

console.log('Canvas', canvas, cxt)
