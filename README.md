# Tempus

# Requisites

```bash
sudo apt-get install npm
sudo npm install --global web-ext
```

# Development

## Build

```bash
cd src
web-ext build
```

## Execute

```bash
cd src
web-ext run
```

# Test

```bash
docker build -t tempus .
docker run -v $PWD:/app -it tempus npm test
```