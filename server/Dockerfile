FROM golang:1.21.6-alpine as builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o main

FROM alpine:latest

COPY --from=builder /app/main ./

EXPOSE 3000

CMD [ "./main" ]
