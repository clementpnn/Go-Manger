package service

import (
	"crypto/rand"
	"log"
)

func GeneratePassword() string {
	const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
	b := make([]byte, 10)
	_, err := rand.Read(b)
	if err != nil {
		log.Fatal(err)
	}

	for i, val := range b {
		b[i] = chars[val%byte(len(chars))]
	}

	return string(b)
}
