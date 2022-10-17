FROM golang:1.18-alpine as builder

# Bundle app source
WORKDIR /app
COPY . .

# Compile Go Code
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags='-w -s -extldflags "-static"' -a -o /main .

FROM scratch as app
COPY --from=builder /main /main

ENTRYPOINT [ "/main" ] 