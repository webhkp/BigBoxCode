// xor_operation.go

package main

type XorOperation struct {
	op1 Operation
	op2 Operation
}

func NewXorOperation(op1 Operation, op2 Operation) (xorOperation *XorOperation) {
	xorOperation = &XorOperation{}
	xorOperation.op1 = op1
	xorOperation.op2 = op2
	return
}

func (xorOperation *XorOperation) Execute(opContext string) bool {
	return xorOperation.op1.Execute(opContext) != xorOperation.op2.Execute(opContext)
}
