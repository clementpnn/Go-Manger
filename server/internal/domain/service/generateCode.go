package service

import (
	"math/rand"
)

func GenerateCode() string {
	letters := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	numbers := "0123456789"
	code := ""

	for i := 0; i < 3; i++ {
		code += string(letters[rand.Intn(len(letters))])
	}

	for i := 0; i < 2; i++ {
		code += string(numbers[rand.Intn(len(numbers))])
	}

	return code
}
