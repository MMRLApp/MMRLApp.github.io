# Plugins

In the MX Engine you can either use Lua or Dex files for plugins, or you combine both.

## Lua

The setup for Lua plugins are pretty easy. You have to create a `index.lua` in the `webroot` folder to get started.

Please not that in the `index.lua` not all features are avaiable. Better is to require a file from another directory or so 

`index.lua`:

```lua
require("lua/plugin")
```

How the directory strutuce should look like

```
├── module.prop
└── webroot
    ├── index.lua
    └── lua
        └── plugin.lua
```
