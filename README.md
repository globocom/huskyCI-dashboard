<p align="center"><a href="https://huskyci.opensource.globo.com
  "><img src="logo-README.png"/></a></p>

<p align="center">
  <a href="https://github.com/globocom/huskyCI-dashboard/releases"><img src="https://img.shields.io/github/v/release/globocom/huskyCI-dashboard"/></a>
  <a href="https://circleci.com/gh/globocom/huskyCI/tree/master"><img src="https://img.shields.io/circleci/build/github/globocom/huskyCI-dashboard/master?token=f0a1cf0782407f6cf8f87705fbd3f5d5d579bed1"/></a>
  <a href="https://github.com/rafaveira3/writing-and-presentations/blob/master/DEFCON-27-APP-SEC-VILLAGE-Rafael-Santos-huskyCI-Finding-security-flaws-in-CI-before-deploying-them.pdf"><img src="https://img.shields.io/badge/DEFCON%2027-AppSec%20Village-blueviolet"/></a>
  <a href="https://www.blackhat.com/eu-19/arsenal/schedule/#huskyci-performing-security-tests-inside-your-ci-17792"><img src="https://img.shields.io/badge/Black%20Hat%20Arsenal-Europe%202019-black"/></a>
</p>

## How does it work?

The main goal of this project is to provide a front-end for every huskyCI user to check the stats of the analyses done. If you don't know yet what huskyCI is, check it out [here](https://github.com/globocom/huskyCI).

<p align="center"><img src="https://github.com/globocom/huskyCI/blob/master/huskyCI-dashboard.png"/></p>

## Requirements

### Node

If you don't have Node installed in your environment, follow the instructions [here](https://gist.github.com/d2s/372b5943bce17b964a79) for your correspondent OS.

### Yarn

```sh
npm install -g yarn
```

## Installing

```sh
make install
```

```sh
. .env
```

## Running

```sh
make run
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process of submitting pull requests to huskyCI-dashboard.

## License

This project is licensed under the BSD 3-Clause "New" or "Revised" License - read [LICENSE](LICENSE) file for details.

[Docker Install]:  https://docs.docker.com/install/
