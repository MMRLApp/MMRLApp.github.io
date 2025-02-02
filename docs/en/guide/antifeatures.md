# Anti-Features in MMRL  

MMRL supports anti-features similar to F-Droid, allowing modules to be marked with characteristics users may want to avoid.  

These anti-features can only be set in `track.json`:  

```json
"antifeatures": ["Ads"]
```

## List of Anti-Features  

### `Ads`  
Includes advertising.  

### `Tracking`  
Tracks and/or reports your activity, even if it can be turned off.  

### `NonFreeNet`  
Promotes or depends entirely on a non-changeable or non-free network service.  

### `NonFreeAdd`  
Promotes other non-libre modules or plugins.  

### `NonFreeDep`  
Requires a non-libre module to function (e.g., Google Maps, Market).  

### `NSFW`  
Contains content the user may not want to be publicized or visible everywhere.  

### `UpstreamNonFree`  
Upstream source code is not libre, with non-free parts replaced or rewritten.  

### `NonFreeAssets`  
Includes non-libre media (e.g., images, sound, music, 3D models, video).  

### `KnownVuln`  
Contains a known security vulnerability.  

### `NoSourceSince`  
Source code is no longer available, preventing new releases.  

### `Obfuscation`  
Includes obfuscated code.  

### `UnaskedRemoval`  
Removes apps, permissions, or modules without user approval (excluding modules that disable other modules).  

### `LLM`  
Partially or fully written by an LLM.  