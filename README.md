# Tempus

# Development

# Requisites

```bash
sudo apt-get install npm docker.io
sudo npm install --global web-ext
```

## Execute

```bash
cd src
web-ext run
```

# Test

```bash
docker build -t tempus .
docker run -v $PWD:/app -it tempus npm install
```

```bash
docker run -v $PWD:/app -it tempus npm test
```

## Build

```bash
cd src
web-ext build
```