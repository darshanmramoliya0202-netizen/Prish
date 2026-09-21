# assets-src

Source files that are processed into `public/` by scripts. Only this README is tracked —
everything under `assets-src/photos/` is git-ignored (keep the originals on F: with the other
company sources) and its processed outputs are committed instead.

```
assets-src/photos/products/<slug>/bowl.*    → public/photos/products/<slug>/bowl.png   (1600², alpha)
assets-src/photos/products/<slug>/macro.*   → public/photos/products/<slug>/macro.jpg  (1200²)
assets-src/photos/products/<slug>/source.*  → public/photos/products/<slug>/source.jpg (≤1600 wide)
assets-src/photos/site/<id>.*               → public/photos/site/<id>.jpg              (≤2400 wide)
```

Run `npm run photos:prep` after dropping files (also runs in `prebuild`). What to shoot or
generate, the honesty rules and every prompt: [`docs/photo-brief.md`](../docs/photo-brief.md).
