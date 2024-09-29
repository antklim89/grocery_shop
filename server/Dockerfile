FROM alpine:3.20

ARG PB_VERSION=0.22.21
RUN apk add --no-cache unzip ca-certificates

RUN PB_ARCH= && case $(uname -m) in\
    x86_64 | amd64 | x64) PB_ARCH='amd64' ;;\
    arm64 | aarch64 | armv8* | armv9*) PB_ARCH='arm64' ;;\
    *) echo "Unknown architecture" ;;\
esac && wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${PB_ARCH}.zip -O /tmp/pb.zip


RUN unzip /tmp/pb.zip -d /pb/
RUN rm /tmp/pb.zip

COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]