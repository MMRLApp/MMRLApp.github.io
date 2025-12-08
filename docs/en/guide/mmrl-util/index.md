---
title: MMRL-Util - Build Your Own Module Repository
description: Complete guide to MMRL-Util for creating custom Magisk module repositories. Learn installation, configuration, and management of your own module repository.
---

# Magisk Modules Repo Util

This util is to build module repository for [MMRL](https://github.com/DerGoogler/MMRL)

## Getting Started

### Install dependencies

```shell
pip3 install mmrl-util
```

### New config.json

You can write it to `your-repo/json/config.json` by yourself, or

```shell
cli.py config --stdin << EOF
{
  "name": "Your Magisk Repo",
  "base_url": "https://you.github.io/magisk-modules-repo/",
  "max_num": 3,
  "enable_log": true,
  "log_dir": "log"
}
EOF
```

or

```shell
cli.py config --write name="Your Magisk Repo" base_url="https://you.github.io/magisk-modules-repo/" max_num=3 enable_log=true log_dir="log"
```

## How to update by GitHub Actions?

- You can refer to our [example-repository](https://github.com/Googlers-Repo/example-repository).

## mmrl-util

```
mmrl-util --help
usage: mmrl-util [-h] [-v] [-V] command ...

Magisk Modules Repo Util

positional arguments:
  command
    config            Modify config of repository.
    track             Module tracks utility.
    github            Generate tracks from GitHub.
    sync              Sync modules in repository.
    index             Generate modules.json from local.
    check             Content check and migrate.
    sitemap           Sitemap generator.

options:
  -h, --help          Show this help message and exit.
  -v, --version       Show util version and exit.
  -V, --version-code  Show util version code and exit.
```

### Learn more!

- [TrackJson](./track-json)
- [ConfigJson](./config-json)
- [RepoJson](./repo-json)