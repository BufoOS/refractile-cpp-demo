package main

import (
	"strconv"
	"syscall/js"
)

// This calls a JS function from Go.
func main() {
	c := make(chan struct{}, 0)

	// Expose the Go function to JavaScript
	js.Global().Set("fibonacci", js.FuncOf(fibonacci)); 

	<-c
}

func fibFunc(n int64) int64 {
	if n <= 1 {
		return n;
	}
    return fibFunc(n - 1) + fibFunc(n - 2)
}

func fibonacci(this js.Value, inputs []js.Value) any {
	req := inputs[0]; 
	res := inputs[1]; 
	next := inputs[2];

	value := req.Get("params").Get("value").String();
	toFib, _ := strconv.ParseInt(value, 10, 64)
	res.Get("locals").Set("result", fibFunc(toFib));
	return next.Invoke();
}
