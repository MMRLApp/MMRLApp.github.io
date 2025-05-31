### `config.json` Documentation

This JSON configuration file contains settings related to a Magisk repository. Below is a detailed explanation of each field in the `config.json` file.

---

### `id` <Badge type="warning" text="required as of 1 Jan, 2026" /> <Badge type="tip" text="R/O" />

An unique id for your repository that cannot be modified when using MMRL-Util


### `name` <Badge type="danger" text="required" />

The name of the repository.

```json
"name": "Template Magisk Modules Repository"
```

### `base_url` <Badge type="danger" text="required" />

The base URL for fetching repository modules and tracks. The end slash is required!

```json
"base_url": "https://example.com/"
```

### `website`

The URL of the repository's website.

```
"website": "https://mmrl.dergoogler.com"
```

### `support`

The URL to the support page for the repository.

```json
"support": "url"
```

### `donate`

The URL where users can donate to support the repository.

```json
"donate": "url"
```

### `submission`

This field allows submitting new tracks or modules to the repository.

```json
"submission": "url"
```

### `description

````

A brief description of the repository.

```json
"description": "url"
````

### `max_num`

Specifies the maximum number of allowed modules or users that the repository can support.

```json
"max_num": 3
```

### `enable_log`

A flag that enables or disables logging. Set to `true` to enable.

```json
"enable_log": true
```

### `log_dir`

Specifies the directory where logs will be stored.

```json
"log_dir": "log"
```
