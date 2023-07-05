// and_operation.go

package main

type AndOperation struct {
	op1 Operation
	op2 Operation
}

func NewAndOperation(op1 Operation, op2 Operation) (andOperation *AndOperation) {
	andOperation = &AndOperation{}
	andOperation.op1 = op1
	andOperation.op2 = op2
	return
}

func (andOperation *AndOperation) Execute(opContext string) bool {
	return andOperation.op1.Execute(opContext) && andOperation.op2.Execute(opContext)
}
