FROM golang:1.18-alpine as builder
WORKDIR /app
COPY . .
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags='-w -s -extldflags "-static"' -a -o /main .

FROM scratch as app
COPY --from=builder /main /main

ENTRYPOINT [ "/main" ] 