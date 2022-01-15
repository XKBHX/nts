import { ABS, ABX, ABY, AddressingMode, IMM, IMP, IND, IZX, IZY, REL } from './addressing';

export type OpCode = () => number;

export const ADC: OpCode = () => 0
export const AND: OpCode = () => 0
export const ASL: OpCode = () => 0
export const BCC: OpCode = () => 0
export const BCS: OpCode = () => 0
export const BEQ: OpCode = () => 0
export const BIT: OpCode = () => 0
export const BMI: OpCode = () => 0
export const BNE: OpCode = () => 0
export const BPL: OpCode = () => 0
export const BRK: OpCode = () => 0
export const BVC: OpCode = () => 0
export const BVS: OpCode = () => 0
export const CLC: OpCode = () => 0
export const CLD: OpCode = () => 0
export const CLI: OpCode = () => 0
export const CLV: OpCode = () => 0
export const CMP: OpCode = () => 0
export const CPX: OpCode = () => 0
export const CPY: OpCode = () => 0
export const DEC: OpCode = () => 0
export const DEX: OpCode = () => 0
export const DEY: OpCode = () => 0
export const EOR: OpCode = () => 0
export const INC: OpCode = () => 0
export const INX: OpCode = () => 0
export const INY: OpCode = () => 0
export const JMP: OpCode = () => 0
export const JSR: OpCode = () => 0
export const LDA: OpCode = () => 0
export const LDX: OpCode = () => 0
export const LDY: OpCode = () => 0
export const LSR: OpCode = () => 0
export const NOP: OpCode = () => 0
export const ORA: OpCode = () => 0
export const PHA: OpCode = () => 0
export const PHP: OpCode = () => 0
export const PLA: OpCode = () => 0
export const PLP: OpCode = () => 0
export const ROL: OpCode = () => 0
export const ROR: OpCode = () => 0
export const RTI: OpCode = () => 0
export const RTS: OpCode = () => 0
export const SBC: OpCode = () => 0
export const SEC: OpCode = () => 0
export const SED: OpCode = () => 0
export const SEI: OpCode = () => 0
export const STA: OpCode = () => 0
export const STX: OpCode = () => 0
export const STY: OpCode = () => 0
export const TAX: OpCode = () => 0
export const TAY: OpCode = () => 0
export const TSX: OpCode = () => 0
export const TXA: OpCode = () => 0
export const TXS: OpCode = () => 0
export const TYA: OpCode = () => 0

export const XXX = () => 0 //Illegal OP Code

export type Instruction = {
    name: string;
    operate: OpCode;
    mode: AddressingMode;
    cycles: number
}

export const instructions: Instruction[] = [
    { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ORA', operate: ORA, mode: IZX, cycles: 6 }, { name: 'STP', operate: XXX, mode: IMP, cycles: 2 }, { name: 'SLO', operate: XXX, mode: IMP, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IMM, cycles: 7 }, { name: 'ASL', operate: ASL, mode: IMM, cycles: 7 }, { name: 'ANC', operate: XXX, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ORA', operate: ORA, mode: IMM, cycles: 2 }, { name: 'ASL', operate: ASL, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ORA', operate: ORA, mode: ABS, cycles: 4 }, { name: 'ASL', operate: ASL, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ORA', operate: ORA, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ORA', operate: ORA, mode: ABX, cycles: 4 }, { name: 'ASL', operate: ASL, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'JSR', operate: JSR, mode: ABS, cycles: 6 }, { name: 'AND', operate: AND, mode: IZY, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'AND', operate: AND, mode: IMM, cycles: 2 }, { name: 'ROL', operate: ROL, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BIT', operate: BIT, mode: ABS, cycles: 4 }, { name: 'AND', operate: AND, mode: ABS, cycles: 4 }, { name: 'ROL', operate: ROL, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BMI', operate: BMI, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'AND', operate: AND, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'AND', operate: AND, mode: ABX, cycles: 4 }, { name: 'ROL', operate: ROL, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'RTI', operate: RTI, mode: IMP, cycles: 6 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'EOR', operate: EOR, mode: IMM, cycles: 2 }, { name: 'LSR', operate: LSR, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'JMP', operate: JMP, mode: ABS, cycles: 3 }, { name: 'EOR', operate: EOR, mode: ABS, cycles: 4 }, { name: 'LSR', operate: LSR, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'EOR', operate: EOR, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'EOR', operate: EOR, mode: ABX, cycles: 4 }, { name: 'LSR', operate: LSR, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ADC', operate: ADC, mode: IMM, cycles: 2 }, { name: 'ROR', operate: ROR, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'JMP', operate: JMP, mode: IND, cycles: 5 }, { name: 'ADC', operate: ADC, mode: ABS, cycles: 4 }, { name: 'ROR', operate: ROR, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'ADC', operate: ADC, mode: ABY, cycles: 4 }, { name: '???', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'ADC', operate: ADC, mode: ABX, cycles: 4 }, { name: 'ROR', operate: ROR, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: '???', operate: NOP, mode: IMM, cycles: 2 }, { name: 'TXA', operate: TXA, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'STY', operate: STY, mode: ABS, cycles: 4 }, { name: 'STA', operate: STA, mode: ABS, cycles: 4 }, { name: 'STX', operate: STX, mode: ABS, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'STA', operate: STA, mode: ABY, cycles: 5 }, { name: 'TXS', operate: TXS, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: '???', operate: NOP, mode: IMP, cycles: 5 }, { name: 'STA', operate: STA, mode: ABX, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 5 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'LDA', operate: LDA, mode: IMM, cycles: 2 }, { name: 'TAX', operate: TAX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'LDY', operate: LDY, mode: ABS, cycles: 4 }, { name: 'LDA', operate: LDA, mode: ABS, cycles: 4 }, { name: 'LDX', operate: LDX, mode: ABS, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'LDA', operate: LDA, mode: ABY, cycles: 4 }, { name: 'TSX', operate: TSX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 }, { name: 'LDY', operate: LDY, mode: ABX, cycles: 4 }, { name: 'LDA', operate: LDA, mode: ABX, cycles: 4 }, { name: 'LDX', operate: LDX, mode: ABY, cycles: 4 }, { name: '???', operate: XXX, mode: IMP, cycles: 4 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'CMP', operate: CMP, mode: IMM, cycles: 2 }, { name: 'DEX', operate: DEX, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'CPY', operate: CPY, mode: ABS, cycles: 4 }, { name: 'CMP', operate: CMP, mode: ABS, cycles: 4 }, { name: 'DEC', operate: DEC, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'CMP', operate: CMP, mode: ABY, cycles: 4 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'CMP', operate: CMP, mode: ABX, cycles: 4 }, { name: 'DEC', operate: DEC, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'SBC', operate: SBC, mode: IMM, cycles: 2 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: SBC, mode: IMP, cycles: 2 }, { name: 'CPX', operate: CPX, mode: ABS, cycles: 4 }, { name: 'SBC', operate: SBC, mode: ABS, cycles: 4 }, { name: 'INC', operate: INC, mode: ABS, cycles: 6 }, { name: '???', operate: XXX, mode: IMP, cycles: 6 },
    { name: 'BPL', operate: BPL, mode: REL, cycles: 2 }, { name: 'ORA', operate: ORA, mode: IZY, cycles: 5 }, { name: '???', operate: XXX, mode: IMP, cycles: 2 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'BRK', operate: BRK, mode: IMM, cycles: 7 }, { name: 'SBC', operate: SBC, mode: ABY, cycles: 4 }, { name: 'NOP', operate: NOP, mode: IMP, cycles: 2 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 }, { name: '???', operate: NOP, mode: IMP, cycles: 4 }, { name: 'SBC', operate: SBC, mode: ABX, cycles: 4 }, { name: 'INC', operate: INC, mode: ABX, cycles: 7 }, { name: '???', operate: XXX, mode: IMP, cycles: 7 },
]