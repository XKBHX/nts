import { ABS, ABX, ABY, AddressingMode, IMM, IMP, IND, IZX, IZY, REL, ZP0, ZPX, ZPY } from './addressing';
import { Cpu, FLAG } from './cpu'

export type OpCode = (c: Cpu) => number;

export const ADC: OpCode = (c) => {
    c.fetch()
    
    const temp = c.a + c.fetched + c.getFlag(FLAG.C)
    
    c.setFlag(FLAG.C, temp > 255)
    c.setFlag(FLAG.Z, (temp & 0x00ff) === 0)
    c.setFlag(FLAG.N, temp === 0x80)
    c.setFlag(FLAG.V, !!((~(c.a ^ c.fetched) & (c.a ^ temp)) & 0x0080))
    c.a = temp & 0x00ff

    return 1
}

export const AND: OpCode = (c) => {
    c.fetch()
    c.a = c.a & c.fetched
    c.setFlag(FLAG.Z, c.a === 0x00)
    c.setFlag(FLAG.N, c.a === 0x80)

    return 1
}

export const ASL: OpCode = (c) => 0

export const BCC: OpCode = (c) => {
    if(c.getFlag(FLAG.C) === 0) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BCS: OpCode = (c) => {
    if(c.getFlag(FLAG.C) === 1) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BEQ: OpCode = (c) => {
    if(c.getFlag(FLAG.Z) === 1) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BIT: OpCode = (c) => 0

export const BMI: OpCode = (c) => {
    if(c.getFlag(FLAG.N) === 1) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BNE: OpCode = (c) => {
    if(c.getFlag(FLAG.Z) === 0) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BPL: OpCode = (c) => {
    if(c.getFlag(FLAG.N) === 0) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BRK: OpCode = (c) => 0

export const BVC: OpCode = (c) => {
    if(c.getFlag(FLAG.V) === 0) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const BVS: OpCode = (c) => {
    if(c.getFlag(FLAG.V) === 1) {
        c.cycles++
        c.absoluteAddress = c.pc + c.relativeAddress

        if((c.absoluteAddress & 0xff00) !== (c.pc & 0xff00)) c.cycles++

        c.pc = c.absoluteAddress
    }

    return 0
}

export const CLC: OpCode = (c) => {
    c.setFlag(FLAG.C, false)
    return 0
}

export const CLD: OpCode = (c) => {
    c.setFlag(FLAG.D, false)
    return 0
}

export const CLI: OpCode = (c) => {
    c.setFlag(FLAG.I, false)
    return 0
}

export const CLV: OpCode = (c) => {
    c.setFlag(FLAG.V, false)
    return 0
}

export const CMP: OpCode = (c) => 0
export const CPX: OpCode = (c) => 0
export const CPY: OpCode = (c) => 0
export const DEC: OpCode = (c) => 0
export const DEX: OpCode = (c) => 0
export const DEY: OpCode = (c) => 0
export const EOR: OpCode = (c) => 0
export const INC: OpCode = (c) => 0
export const INX: OpCode = (c) => 0
export const INY: OpCode = (c) => 0
export const JMP: OpCode = (c) => 0
export const JSR: OpCode = (c) => 0
export const LDA: OpCode = (c) => 0
export const LDX: OpCode = (c) => 0
export const LDY: OpCode = (c) => 0
export const LSR: OpCode = (c) => 0
export const NOP: OpCode = (c) => 0
export const ORA: OpCode = (c) => 0

export const PHA: OpCode = (c) => {
    c.write(0x0100 + c.sp, c.a)
    return 0;
}

export const PHP: OpCode = (c) => 0
export const PLA: OpCode = (c) => 0
export const PLP: OpCode = (c) => 0
export const ROL: OpCode = (c) => 0
export const ROR: OpCode = (c) => 0
export const RTI: OpCode = (c) => 0
export const RTS: OpCode = (c) => 0

export const SBC: OpCode = (c) => {
    c.fetch()
    
    const value = c.fetched ^ 0x00ff
    const temp = c.a + value + c.getFlag(FLAG.C)
    
    c.setFlag(FLAG.C, !!(temp & 0x00ff))
    c.setFlag(FLAG.Z, (temp & 0x00ff) === 0)
    c.setFlag(FLAG.V, !!((temp ^ c.a) & (temp ^ value) & 0x0080))
    c.setFlag(FLAG.N, temp === 0x80)
    c.a = temp & 0x00ff

    return 1
}

export const SEC: OpCode = (c) => 0
export const SED: OpCode = (c) => 0
export const SEI: OpCode = (c) => 0
export const STA: OpCode = (c) => 0
export const STX: OpCode = (c) => 0
export const STY: OpCode = (c) => 0
export const TAX: OpCode = (c) => 0
export const TAY: OpCode = (c) => 0
export const TSX: OpCode = (c) => 0
export const TXA: OpCode = (c) => 0
export const TXS: OpCode = (c) => 0
export const TYA: OpCode = (c) => 0

export const XXX = () => 0 //Illegal OP Code

export type Instruction = {
    name: string;
    operate: OpCode;
    mode: AddressingMode;
    cycles: number
}

export const instructions: Instruction[] = [
    { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ORA', operate: ORA, mode: IZX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 3 }, { name: 'ORA', operate: ORA, mode: ZP0, cycles: 3 }, { name: 'ASL', operate: ASL, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'PHP', operate: PHP, mode: IMP, cycles: 3 }, { name: 'ORA', operate: ORA, mode: IMM, cycles: 2 }, { name: 'ASL', operate: ASL, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ORA', operate: ORA, mode: ABS, cycles: 4 }, { name: 'ASL', operate: ASL, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ORA', operate: ORA, mode: ZPX, cycles: 4 }, { name: 'ASL', operate: ASL, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'CLC', operate: CLC, mode: IMP, cycles: 2 }, { name: 'ORA', operate: ORA, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ORA', operate: ORA, mode: ABX, cycles: 4 }, { name: 'ASL', operate: ASL, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'JSR', operate: JSR, mode: ABS, cycles: 6 }, { name: 'AND', operate: AND, mode: IZX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: 'BIT', operate: BIT, mode: ZP0, cycles: 3 }, { name: 'AND', operate: AND, mode: ZP0, cycles: 3 }, { name: 'ROL', operate: ROL, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'PLP', operate: PLP, mode: IMP, cycles: 4 }, { name: 'AND', operate: AND, mode: IMM, cycles: 2 }, { name: 'ROL', operate: ROL, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BIT', operate: BIT, mode: ABS, cycles: 4 }, { name: 'AND', operate: AND, mode: ABS, cycles: 4 }, { name: 'ROL', operate: ROL, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BMI', operate: BMI, mode: REL, cycles: 2 }, { name: 'AND', operate: AND, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'AND', operate: AND, mode: ZPX, cycles: 4 }, { name: 'ROL', operate: ROL, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'SEC', operate: SEC, mode: IMP, cycles: 2 }, { name: 'AND', operate: AND, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'AND', operate: AND, mode: ABX, cycles: 4 }, { name: 'ROL', operate: ROL, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'RTI', operate: RTI, mode: IMP, cycles: 6 }, { name: 'EOR', operate: EOR, mode: IZX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 3 }, { name: 'EOR', operate: EOR, mode: ZP0, cycles: 3 }, { name: 'LSR', operate: LSR, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'PHA', operate: PHA, mode: IMP, cycles: 3 }, { name: 'EOR', operate: EOR, mode: IMM, cycles: 2 }, { name: 'LSR', operate: LSR, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'JMP', operate: JMP, mode: ABS, cycles: 3 }, { name: 'EOR', operate: EOR, mode: ABS, cycles: 4 }, { name: 'LSR', operate: LSR, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BVC', operate: BVC, mode: REL, cycles: 2 }, { name: 'EOR', operate: EOR, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'EOR', operate: EOR, mode: ZPX, cycles: 4 }, { name: 'LSR', operate: LSR, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'CLI', operate: CLI, mode: IMP, cycles: 2 }, { name: 'EOR', operate: EOR, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'EOR', operate: EOR, mode: ABX, cycles: 4 }, { name: 'LSR', operate: LSR, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'RTS', operate: RTS, mode: IMP, cycles: 6 }, { name: 'ADC', operate: ADC, mode: IZX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 3 }, { name: 'ADC', operate: ADC, mode: ZP0, cycles: 3 }, { name: 'ROR', operate: ROR, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'PLA', operate: PLA, mode: IMP, cycles: 4 }, { name: 'ADC', operate: ADC, mode: IMM, cycles: 2 }, { name: 'ROR', operate: ROR, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'JMP', operate: JMP, mode: IND, cycles: 5 }, { name: 'ADC', operate: ADC, mode: ABS, cycles: 4 }, { name: 'ROR', operate: ROR, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BVS', operate: BVS, mode: REL, cycles: 2 }, { name: 'ADC', operate: ADC, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ADC', operate: ADC, mode: ZPX, cycles: 4 }, { name: 'ROR', operate: ROR, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'SEI', operate: SEI, mode: IMP, cycles: 2 }, { name: 'ADC', operate: ADC, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ADC', operate: ADC, mode: ABX, cycles: 4 }, { name: 'ROR', operate: ROR, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: 'STA', operate: STA, mode: IZX, cycles: 6 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'STY', operate: STY, mode: ZP0, cycles: 3 }, { name: 'STA', operate: STA, mode: ZP0, cycles: 3 }, { name: 'STX', operate: STX, mode: ZP0, cycles: 3 }, { name: '???', operate: XXX, mode: IMP, cycles: 3 }, { name: 'DEY', operate: DEY, mode: IMP, cycles: 2 }, { name: '???', operate: NOP, mode: IMM, cycles: 2 }, { name: 'TXA', operate: TXA, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'STY', operate: STY, mode: ABS, cycles: 4 }, { name: 'STA', operate: STA, mode: ABS, cycles: 4 }, { name: 'STX', operate: STX, mode: ABS, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'BCC', operate: BCC, mode: REL, cycles: 2 }, { name: 'STA', operate: STA, mode: IZY, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'STY', operate: STY, mode: ZPX, cycles: 4 }, { name: 'STA', operate: STA, mode: ZPX, cycles: 4 }, { name: 'STX', operate: STX, mode: ZPY, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 }, { name: 'TYA', operate: TYA, mode: IMP, cycles: 2 }, { name: 'STA', operate: STA, mode: ABY, cycles: 5 }, { name: 'TXS', operate: TXS, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: '???', operate: NOP, mode: IMP, cycles: 5 }, { name: 'STA', operate: STA, mode: ABX, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 },
    { name: 'LDY', operate: LDY, mode: IMM, cycles: 2 }, { name: 'LDA', operate: LDA, mode: IZX, cycles: 6 }, { name: 'LDX', operate: LDX, mode: IMM, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'LDY', operate: LDY, mode: ZP0, cycles: 3 }, { name: 'LDA', operate: LDA, mode: ZP0, cycles: 3 }, { name: 'LDX', operate: LDX, mode: ZP0, cycles: 3 }, { name: '???', operate: XXX, mode: IMP, cycles: 3 }, { name: 'TAY', operate: TAY, mode: IMP, cycles: 2 }, { name: 'LDA', operate: LDA, mode: IMM, cycles: 2 }, { name: 'TAX', operate: TAX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'LDY', operate: LDY, mode: ABS, cycles: 4 }, { name: 'LDA', operate: LDA, mode: ABS, cycles: 4 }, { name: 'LDX', operate: LDX, mode: ABS, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'BCS', operate: BCS, mode: REL, cycles: 2 }, { name: 'LDA', operate: LDA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'LDY', operate: LDY, mode: ZPX, cycles: 4 }, { name: 'LDA', operate: LDA, mode: ZPX, cycles: 4 }, { name: 'LDX', operate: LDX, mode: ZPY, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 }, { name: 'CLV', operate: CLV, mode: IMP, cycles: 2 }, { name: 'LDA', operate: LDA, mode: ABY, cycles: 4 }, { name: 'TSX', operate: TSX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 }, { name: 'LDY', operate: LDY, mode: ABX, cycles: 4 }, { name: 'LDA', operate: LDA, mode: ABX, cycles: 4 }, { name: 'LDX', operate: LDX, mode: ABY, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'CPY', operate: CPY, mode: IMM, cycles: 2 }, { name: 'CMP', operate: CMP, mode: IZX, cycles: 6 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: 'CPY', operate: CPY, mode: ZP0, cycles: 3 }, { name: 'CMP', operate: CMP, mode: ZP0, cycles: 3 }, { name: 'DEC', operate: DEC, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'INY', operate: INY, mode: IMP, cycles: 2 }, { name: 'CMP', operate: CMP, mode: IMM, cycles: 2 }, { name: 'DEX', operate: DEX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'CPY', operate: CPY, mode: ABS, cycles: 4 }, { name: 'CMP', operate: CMP, mode: ABS, cycles: 4 }, { name: 'DEC', operate: DEC, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BNE', operate: BNE, mode: REL, cycles: 2 }, { name: 'CMP', operate: CMP, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'CMP', operate: CMP, mode: ZPX, cycles: 4 }, { name: 'DEC', operate: DEC, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'CLD', operate: CLD, mode: IMP, cycles: 2 }, { name: 'CMP', operate: CMP, mode: ABY, cycles: 4 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'CMP', operate: CMP, mode: ABX, cycles: 4 }, { name: 'DEC', operate: DEC, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'CPX', operate: CPX, mode: IMM, cycles: 2 }, { name: 'SBC', operate: SBC, mode: IZX, cycles: 6 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: 'CPX', operate: CPX, mode: ZP0, cycles: 3 }, { name: 'SBC', operate: SBC, mode: ZP0, cycles: 3 }, { name: 'INC', operate: INC, mode: ZP0, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: 'INX', operate: INX, mode: IMP, cycles: 2 }, { name: 'SBC', operate: SBC, mode: IMM, cycles: 2 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: SBC, mode: IMP, cycles: 2 }, { name: 'CPX', operate: CPX, mode: ABS, cycles: 4 }, { name: 'SBC', operate: SBC, mode: ABS, cycles: 4 }, { name: 'INC', operate: INC, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BEQ', operate: BEQ, mode: REL, cycles: 2 }, { name: 'SBC', operate: SBC, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 8 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'SBC', operate: SBC, mode: ZPX, cycles: 4 }, { name: 'INC', operate: INC, mode: ZPX, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 }, { name: 'SED', operate: SED, mode: IMP, cycles: 2 }, { name: 'SBC', operate: SBC, mode: ABY, cycles: 4 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'SBC', operate: SBC, mode: ABX, cycles: 4 }, { name: 'INC', operate: INC, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
]