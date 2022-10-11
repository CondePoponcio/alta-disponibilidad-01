# Soy un backend vacio :3
FROM alpine:3.15

#RUN groupadd -r developers && useradd --no-log-init -r -g developers admin

# -g is the GID
RUN addgroup -g 1000 developers

# -u is the UID
# -D permits to create an user without password
RUN adduser -u 1000 -G developers -h /home/admin -D admin

USER admin

CMD tail -f /dev/null