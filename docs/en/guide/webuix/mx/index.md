# Introducing the MX Engine

The **MX Engine** is the next generation of the WebUI X: Portable runtime, designed to provide improved performance, greater stability, and a modern foundation for future development.

Unlike the previous engine, the MX Engine has been extensively reworked from the ground up. Its new architecture is significantly more modular and extensible, allowing us to introduce new features without breaking existing functionality or introducing race conditions.

While the MX Engine is already fully usable, it is still under active development. We greatly appreciate your feedback and detailed bug reports, as they help us improve the engine and resolve issues more quickly.

## Plugin System

The MX Engine introduces a built-in **Lua plugin system**, allowing developers to extend the WebUI without modifying the core runtime.

Using pure Lua, you can create:

- Custom path handlers
- JavaScript interfaces
- Runtime extensions

Support for **DEX-based plugins** is also planned for a future release.

> Comprehensive API documentation and developer guides will be released over the coming weeks and months.

## Improved Security

Security has been significantly enhanced throughout the MX Engine.

Some of the improvements include:

- Content Security Policy (CSP) support
- Origin-validated JavaScript interfaces
- Random UUID protection for JavaScript interfaces, even if interface creation fails

These changes help reduce the risk of unauthorized access while maintaining compatibility with existing applications.

> **Note:** The `ksu` interface is intentionally exposed without origin validation.

## Enhanced Developer Tools

The MX Engine provides a greatly improved debugging experience compared to the previous WX Engine.

Applications can be inspected directly using **Chrome DevTools**, making it easier to debug JavaScript, inspect network activity, and analyze runtime behavior.

The DevTools integration also supports **Snippets**, allowing you to execute custom JavaScript, quickly test changes, and reload your application during development.

> **Note:** If you are using Chrome DevTools, disable the console interceptor in the developer settings to view console logs correctly.

## New APIs

The MX Engine introduces a growing collection of new APIs that simplify application development and unlock new capabilities.

Over the coming weeks and months, we will continue publishing documentation covering:

- API reference documentation
- Usage examples
- Migration guides
- Best practices

Our goal is to make migrating existing applications to the MX Engine as straightforward as possible.

---

*This documentation is subject to change as the MX Engine continues to evolve.*
