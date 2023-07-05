// or_operation.go

package main

type OrOperation struct {
	op1 Operation
	op2 Operation
}

func NewOrOperation(op1 Operation, op2 Operation) (orOperation *OrOperation) {
	orOperation = &OrOperation{}
	orOperation.op1 = op1
	orOperation.op2 = op2
	return
}

func (orOperation *OrOperation) Execute(opContext string) bool {
	return orOperation.op1.Execute(opContext) || orOperation.op2.Execute(opContext)
}
